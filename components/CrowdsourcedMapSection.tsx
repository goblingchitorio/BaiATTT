import React, { useState, useEffect, useRef } from 'react';
import { WasteHotspot, VolunteerFormData } from '../types';
import { INITIAL_HOTSPOTS } from '../data/environmentalData';
import VolunteerModal from './VolunteerModal';
import CleanupActivityModal from './CleanupActivityModal';
import {
  MapPin,
  Camera,
  Navigation,
  Heart,
  UserPlus,
  Filter,
  CheckCircle,
  AlertTriangle,
  Send,
  Upload,
  Sparkles,
  ArrowRight,
  Info,
  Clock,
  Layers,
  Crosshair,
  Maximize2,
  ExternalLink,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  Mail,
  Check,
  X,
  FileText,
  AlertOctagon,
  RefreshCw,
  Eye
} from 'lucide-react';
import L from 'leaflet';

interface CrowdsourcedMapSectionProps {
  onHotspotsCountChange?: (count: number) => void;
  onNavigateToRegistry?: () => void;
}

const ADMIN_EMAIL = '26162051@student.hcmute.edu.vn';

const CITY_PRESETS = [
  { name: 'Hà Nội', lat: 21.0285, lng: 105.8542 },
  { name: 'Đà Nẵng', lat: 16.0544, lng: 108.2022 },
  { name: 'TP.HCM', lat: 10.7769, lng: 106.7009 },
  { name: 'Cầu Kênh Lương (Tham Lương)', lat: 10.8256, lng: 106.6189 },
  { name: 'Kênh Đôi (Quận 8)', lat: 10.7512, lng: 106.6854 },
  { name: 'Nha Trang', lat: 12.2388, lng: 109.1967 },
  { name: 'Cần Thơ', lat: 10.0452, lng: 105.7469 },
  { name: 'Phú Quốc', lat: 10.2899, lng: 103.9840 }
];

const TILE_PROVIDERS = {
  voyager: {
    name: 'Bản đồ Sáng (100% Ổn định)',
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    options: {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" target="_blank">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }
  },
  esri_streets: {
    name: 'Đường Phố Sắc Nét (Esri)',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
    options: {
      attribution: 'Tiles &copy; Esri &mdash; StreetMap',
      maxZoom: 19
    }
  },
  google_streets: {
    name: 'Google Maps Đường Phố',
    url: 'https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
    options: {
      attribution: '&copy; Google Maps',
      subdomains: ['0', '1', '2', '3'],
      maxZoom: 20
    }
  },
  google_hybrid: {
    name: 'Google Maps Vệ Tinh',
    url: 'https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
    options: {
      attribution: '&copy; Google Maps',
      subdomains: ['0', '1', '2', '3'],
      maxZoom: 20
    }
  },
  dark: {
    name: 'Bản đồ Tối (Eco Dark)',
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    options: {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" target="_blank">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }
  },
  satellite: {
    name: 'Vệ tinh Esri',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    options: {
      attribution: 'Tiles &copy; Esri',
      maxZoom: 18
    }
  }
};

const CrowdsourcedMapSection: React.FC<CrowdsourcedMapSectionProps> = ({
  onHotspotsCountChange,
  onNavigateToRegistry
}) => {
  const [mapTheme, setMapTheme] = useState<keyof typeof TILE_PROVIDERS>('voyager');
  const currentTileLayerRef = useRef<L.TileLayer | null>(null);

  // 1. Verified official hotspots (including those In-Progress)
  const [hotspots, setHotspots] = useState<WasteHotspot[]>(() => {
    const saved = localStorage.getItem('gengreen_verified_hotspots');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_HOTSPOTS.filter((h) => !h.isPendingVerification);
  });

  // 2. Pending verification hotspots waiting for admin confirmation
  const [pendingHotspots, setPendingHotspots] = useState<WasteHotspot[]>(() => {
    const saved = localStorage.getItem('gengreen_pending_hotspots');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return INITIAL_HOTSPOTS.filter((h) => h.isPendingVerification);
  });

  // Active filter tab
  const [filterSeverity, setFilterSeverity] = useState<
    'all' | 'in_progress' | 'pending' | 'critical' | 'moderate' | 'cleaned'
  >('all');

  const [selectedHotspot, setSelectedHotspot] = useState<WasteHotspot | null>(null);
  const [volunteerModalHotspot, setVolunteerModalHotspot] = useState<WasteHotspot | null>(null);
  const [activityDetailHotspot, setActivityDetailHotspot] = useState<WasteHotspot | null>(null);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [verificationFeedback, setVerificationFeedback] = useState<string | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formLocation, setFormLocation] = useState('Chân cầu Tham Lương, Kênh Lương, Q. Tân Bình, TP.HCM');
  const [formLat, setFormLat] = useState<number>(10.8256);
  const [formLng, setFormLng] = useState<number>(106.6189);
  const [formSeverity, setFormSeverity] = useState<'critical' | 'moderate'>('critical');
  const [formScale, setFormScale] = useState<'Nhỏ' | 'Vừa' | 'Điểm đen tự phát lớn'>('Điểm đen tự phát lớn');
  const [formDescription, setFormDescription] = useState('');
  const [formImage, setFormImage] = useState<string>('/cau_kenh_luong_that.jpg');

  // Main Map Refs
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  // Report Form Mini-Map Refs
  const formMapContainerRef = useRef<HTMLDivElement>(null);
  const formMapInstanceRef = useRef<L.Map | null>(null);
  const formMarkerRef = useRef<L.Marker | null>(null);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('gengreen_verified_hotspots', JSON.stringify(hotspots));
    if (onHotspotsCountChange) {
      onHotspotsCountChange(hotspots.length);
    }
  }, [hotspots, onHotspotsCountChange]);

  useEffect(() => {
    localStorage.setItem('gengreen_pending_hotspots', JSON.stringify(pendingHotspots));
  }, [pendingHotspots]);

  // ==============================================================
  // 1. MAIN COMMUNITY LEAFLET MAP INITIALIZATION
  // ==============================================================
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Center on Vietnam
    const map = L.map(mapContainerRef.current, {
      center: [15.8, 107.5],
      zoom: 6,
      minZoom: 4,
      maxZoom: 18,
      scrollWheelZoom: true
    });

    // Initial tile layer (CartoDB Voyager)
    const provider = TILE_PROVIDERS[mapTheme];
    const initialTile = L.tileLayer(provider.url, provider.options).addTo(map);
    currentTileLayerRef.current = initialTile;

    const markersGroup = L.layerGroup().addTo(map);
    markersLayerRef.current = markersGroup;
    mapInstanceRef.current = map;

    // Allow user to click on map to choose location for reporting
    map.on('click', (e: L.LeafletMouseEvent) => {
      const lat = parseFloat(e.latlng.lat.toFixed(5));
      const lng = parseFloat(e.latlng.lng.toFixed(5));
      setFormLat(lat);
      setFormLng(lng);
      setFormLocation(`Tọa độ GPS: ${lat}, ${lng}`);

      // Sync form mini map
      if (formMapInstanceRef.current && formMarkerRef.current) {
        formMarkerRef.current.setLatLng([lat, lng]);
        formMapInstanceRef.current.panTo([lat, lng]);
      }
    });

    // Redraw on resize
    const resizeTimer1 = setTimeout(() => map.invalidateSize(), 100);
    const resizeTimer2 = setTimeout(() => map.invalidateSize(), 400);

    const handleResize = () => map.invalidateSize();
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(resizeTimer1);
      clearTimeout(resizeTimer2);
      window.removeEventListener('resize', handleResize);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Switch Tile Provider
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;
    if (currentTileLayerRef.current) {
      map.removeLayer(currentTileLayerRef.current);
    }
    const provider = TILE_PROVIDERS[mapTheme];
    const newLayer = L.tileLayer(provider.url, provider.options);
    newLayer.addTo(map);
    currentTileLayerRef.current = newLayer;
  }, [mapTheme]);

  // ==============================================================
  // 2. REPORT FORM MINI-MAP INITIALIZATION
  // ==============================================================
  useEffect(() => {
    if (!formMapContainerRef.current) return;
    if (formMapInstanceRef.current) return;

    const miniMap = L.map(formMapContainerRef.current, {
      center: [formLat, formLng],
      zoom: 12,
      minZoom: 5,
      maxZoom: 18,
      scrollWheelZoom: true,
      zoomControl: true,
      attributionControl: false
    });

    const tile = L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      {
        subdomains: 'abcd',
        maxZoom: 19
      }
    );
    tile.addTo(miniMap);

    const redPinIcon = L.divIcon({
      className: 'custom-form-pin',
      html: `
        <div style="position: relative; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center;">
          <div style="position: absolute; width: 100%; height: 100%; border-radius: 50%; background: rgba(239,68,68,0.4); animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="width: 22px; height: 22px; border-radius: 50%; background: #ef4444; border: 3px solid #ffffff; box-shadow: 0 4px 10px rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 11px; font-weight: bold;">
            📍
          </div>
        </div>
      `,
      iconSize: [34, 34],
      iconAnchor: [17, 17]
    });

    const marker = L.marker([formLat, formLng], {
      icon: redPinIcon,
      draggable: true
    }).addTo(miniMap);
    formMarkerRef.current = marker;

    marker.on('dragend', () => {
      const pos = marker.getLatLng();
      const lat = parseFloat(pos.lat.toFixed(5));
      const lng = parseFloat(pos.lng.toFixed(5));
      setFormLat(lat);
      setFormLng(lng);
      setFormLocation(`Tọa độ: ${lat}, ${lng}`);
    });

    miniMap.on('click', (e: L.LeafletMouseEvent) => {
      const lat = parseFloat(e.latlng.lat.toFixed(5));
      const lng = parseFloat(e.latlng.lng.toFixed(5));
      setFormLat(lat);
      setFormLng(lng);
      setFormLocation(`Tọa độ: ${lat}, ${lng}`);
      marker.setLatLng([lat, lng]);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.panTo([lat, lng]);
      }
    });

    formMapInstanceRef.current = miniMap;
    setTimeout(() => miniMap.invalidateSize(), 300);

    return () => {
      miniMap.remove();
      formMapInstanceRef.current = null;
    };
  }, []);

  // Sync coordinates
  const updatePinCoordinates = (lat: number, lng: number, locName?: string) => {
    setFormLat(lat);
    setFormLng(lng);
    if (locName) setFormLocation(locName);

    if (formMarkerRef.current) {
      formMarkerRef.current.setLatLng([lat, lng]);
    }
    if (formMapInstanceRef.current) {
      formMapInstanceRef.current.flyTo([lat, lng], 13);
      setTimeout(() => formMapInstanceRef.current?.invalidateSize(), 150);
    }
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([lat, lng], 13);
      setTimeout(() => mapInstanceRef.current?.invalidateSize(), 150);
    }
  };

  // Determine which hotspots to render on map based on active filter
  const displayedHotspots = (() => {
    switch (filterSeverity) {
      case 'pending':
        return pendingHotspots;
      case 'in_progress':
        return hotspots.filter(
          (h) => h.status === 'in_progress' || h.statusText.includes('quá trình xử lý')
        );
      case 'critical':
        return hotspots.filter((h) => h.severity === 'critical' && !h.isPendingVerification);
      case 'moderate':
        return hotspots.filter((h) => h.severity === 'moderate' && !h.isPendingVerification);
      case 'cleaned':
        return hotspots.filter((h) => h.severity === 'cleaned');
      case 'all':
      default:
        return [...hotspots, ...pendingHotspots];
    }
  })();

  // Render Markers on Leaflet Map
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;
    const markersGroup = markersLayerRef.current;
    markersGroup.clearLayers();

    displayedHotspots.forEach((hotspot) => {
      const isPending = hotspot.isPendingVerification === true;
      const isInProgress =
        hotspot.status === 'in_progress' || hotspot.statusText.includes('quá trình xử lý');

      let color = '#ef4444'; // Red
      let symbol = '!';

      if (isPending) {
        color = '#f59e0b'; // Amber 🟡
        symbol = '⏳';
      } else if (isInProgress) {
        color = '#0284c7'; // Sky Blue ⚙️
        symbol = '⚙️';
      } else if (hotspot.severity === 'cleaned') {
        color = '#10b981'; // Green ✓
        symbol = '✓';
      } else if (hotspot.severity === 'moderate') {
        color = '#eab308'; // Yellow
        symbol = '!';
      }

      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="position: relative; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center;">
            <div style="position: absolute; width: 100%; height: 100%; border-radius: 50%; background-color: ${color}; opacity: ${
          isPending ? '0.45' : '0.25'
        }; ${isPending ? 'animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;' : ''}"></div>
            <div style="width: 24px; height: 24px; border-radius: 50%; background-color: ${color}; border: 2.5px solid #ffffff; box-shadow: 0 0 12px rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 11px; font-weight: bold;">
              ${symbol}
            </div>
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 17]
      });

      const marker = L.marker([hotspot.lat, hotspot.lng], { icon: customIcon });

      const popupContent = `
        <div style="font-family: inherit; color: #ffffff; padding: 4px; max-width: 230px;">
          ${
            isPending
              ? `<div style="background: rgba(245, 158, 11, 0.2); border: 1px solid #f59e0b; padding: 4px 6px; border-radius: 6px; margin-bottom: 6px; font-size: 10px; color: #fbbf24; font-weight: bold;">
                  ⏳ CHỜ XÁC NHẬN (Gmail: ${ADMIN_EMAIL})
                </div>`
              : isInProgress
              ? `<div style="background: rgba(2, 132, 199, 0.2); border: 1px solid #0284c7; padding: 4px 6px; border-radius: 6px; margin-bottom: 6px; font-size: 10px; color: #38bdf8; font-weight: bold;">
                  ⚙️ TRONG QUÁ TRÌNH XỬ LÝ (Đã xác nhận có rác)
                </div>`
              : ''
          }
          <strong style="font-size: 13px; display: block; margin-bottom: 2px; color: #ffffff;">${hotspot.title}</strong>
          <div style="font-size: 11px; color: #a1a1aa; margin-bottom: 4px;">📍 ${hotspot.locationName}</div>
          <div style="font-size: 10px; font-weight: 600; color: ${color}; margin-bottom: 4px;">
            ${hotspot.statusText}
          </div>
          <p style="font-size: 11px; line-height: 1.3; color: #d4d4d8; margin: 0 0 6px 0;">${hotspot.description.slice(0, 75)}...</p>
          <div style="border-top: 1px solid #3f3f46; padding-top: 6px; display: flex; flex-direction: column; gap: 4px;">
            <a href="https://www.google.com/maps/dir/?api=1&destination=${hotspot.lat},${hotspot.lng}" target="_blank" rel="noopener noreferrer" style="color: #60a5fa; font-weight: 600; text-decoration: underline; font-size: 11px;">
              🧭 Chỉ đường Google Maps ↗
            </a>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);
      marker.on('click', () => {
        setSelectedHotspot(hotspot);
      });

      markersGroup.addLayer(marker);
    });
  }, [displayedHotspots]);

  // Center map on specific hotspot
  const panToHotspot = (hotspot: WasteHotspot) => {
    setSelectedHotspot(hotspot);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([hotspot.lat, hotspot.lng], 13, {
        duration: 1.2
      });
    }
  };

  // Upvote
  const handleToggleUpvote = (id: string) => {
    setHotspots((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const isUpvoted = !item.hasUpvoted;
          return {
            ...item,
            hasUpvoted: isUpvoted,
            upvotes: isUpvoted ? item.upvotes + 1 : item.upvotes - 1
          };
        }
        return item;
      })
    );
    setPendingHotspots((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const isUpvoted = !item.hasUpvoted;
          return {
            ...item,
            hasUpvoted: isUpvoted,
            upvotes: isUpvoted ? item.upvotes + 1 : item.upvotes - 1
          };
        }
        return item;
      })
    );
  };

  // GPS Auto-detect
  const handleDetectGPS = () => {
    if (!navigator.geolocation) {
      alert('Trình duyệt của bạn không hỗ trợ định vị GPS.');
      return;
    }
    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = parseFloat(pos.coords.latitude.toFixed(5));
        const lng = parseFloat(pos.coords.longitude.toFixed(5));
        updatePinCoordinates(lat, lng, `Vị trí GPS của bạn: ${lat}, ${lng}`);
        setGpsLoading(false);
      },
      () => {
        setGpsLoading(false);
        alert('Không thể lấy vị trí hiện tại. Vui lòng click chọn trực tiếp trên bản đồ.');
      }
    );
  };

  // Image Upload handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // ==============================================================
  // 3. SUBMIT NEW REPORT -> PENDING VERIFICATION WORKFLOW
  // ==============================================================
  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formLocation.trim() || !formDescription.trim()) {
      alert('Vui lòng điền đầy đủ tên địa điểm, vị trí và mô tả ngắn!');
      return;
    }

    const newPendingId = `hs-${Date.now()}`;
    const newPendingHotspot: WasteHotspot = {
      id: newPendingId,
      title: formTitle,
      locationName: formLocation,
      lat: formLat,
      lng: formLng,
      severity: formSeverity,
      status: 'pending_verification',
      isPendingVerification: true,
      description: `${formDescription} (Quy mô: ${formScale})`,
      imageUrl: formImage || '/cau_kenh_luong_that.jpg',
      reportedAt: 'Vừa gửi (Hôm nay)',
      reportedBy: 'Người dân địa phương gửi báo cáo',
      upvotes: 1,
      hasUpvoted: true,
      volunteersNeeded: formSeverity === 'critical' ? 25 : 10,
      volunteersJoined: 1,
      statusText: `Chờ xác nhận (Đang chờ admin ${ADMIN_EMAIL} duyệt)`,
      cleanupDetails: {
        eventDate: 'Dự kiến vào cuối tuần tới (07:30 - 11:30)',
        meetingPoint: formLocation,
        coordinatorName: 'Nguyễn Ngọc Như Ý (Field Coordinator GENGREEN)',
        coordinatorContact: `0934.567.890 / Ban điều phối: ${ADMIN_EMAIL}`,
        targetWaste: `Dự kiến thu gom ~${formSeverity === 'critical' ? '3.0' : '1.5'} tấn rác nhựa và bao bì nilon`,
        requiredGear: [
          'Găng tay vải tráng cao su chống vật sắc nhọn',
          'Ủng bảo hộ hoặc giày thể thao kín mũi',
          'Kẹp gắp rác dài 1m & bao tải dứa thân thiện môi trường'
        ],
        schedule: [
          '07:30 - 08:00: Tập trung tại điểm hẹn, phát trang bị và phổ biến quy định an toàn',
          '08:00 - 10:00: Ra quân thu gom rác nhựa và phân loại tại chỗ',
          '10:00 - 11:30: Chuyển rác về xe ép chuyên dụng và tổng kết số liệu'
        ],
        sponsorsOrPartners: 'GENGREEN Vietnam & Đoàn Thanh niên địa phương'
      }
    };

    // Add to pending hotspots
    setPendingHotspots((prev) => [newPendingHotspot, ...prev]);
    setSelectedHotspot(newPendingHotspot);
    setToastMessage(
      `Báo cáo đã gửi thành công và đang ở trạng thái 'CHỜ XÁC NHẬN'! Biểu mẫu thông báo đã được gửi về Gmail: ${ADMIN_EMAIL}. Khi Gmail này bấm xác nhận có rác, điểm sẽ được lưu chính thức lên web với trạng thái 'Trong quá trình xử lý'.`
    );
    setShowSuccessToast(true);

    // Forward report form to ADMIN_EMAIL via FormSubmit
    try {
      fetch(`https://formsubmit.co/ajax/${ADMIN_EMAIL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `[GENGREEN XÁC NHẬN ĐIỂM RÁC] Cần phê duyệt: ${formTitle}`,
          _template: 'table',
          _captcha: 'false',
          'Tình trạng': '⏳ ĐANG CHỜ XÁC NHẬN CÓ RÁC',
          'Tên điểm rác': formTitle,
          'Địa chỉ / Vị trí': formLocation,
          'Tọa độ GPS': `${formLat}, ${formLng}`,
          'Mức độ ô nhiễm': formSeverity === 'critical' ? '🔴 Điểm đen rác lớn' : '🟡 Ô nhiễm trung bình',
          'Quy mô rác': formScale,
          'Mô tả hiện trạng': formDescription,
          'Thời gian gửi báo cáo': new Date().toLocaleString('vi-VN'),
          'Hướng dẫn phê duyệt': `Khi ban điều phối qua Gmail ${ADMIN_EMAIL} bấm xác nhận có rác, điểm này sẽ được lưu chính thức lên trang web và hiển thị trạng thái "Trong quá trình xử lý".`,
          'Email tiếp nhận': ADMIN_EMAIL
        })
      }).catch((err) => console.warn('FormSubmit report forward:', err));
    } catch (e) {}

    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([formLat, formLng], 13);
    }

    setFormTitle('');
    setFormDescription('');

    setTimeout(() => {
      setShowSuccessToast(false);
    }, 6000);
  };

  // ==============================================================
  // 4. ADMIN VERIFY HOTSPOT -> SAVE TO WEB & MARK "TRONG QUÁ TRÌNH XỬ LÝ"
  // ==============================================================
  const handleVerifyHotspot = (hotspotId: string) => {
    const target = pendingHotspots.find((p) => p.id === hotspotId);
    if (!target) return;

    const confirmed = window.confirm(
      `Xác nhận điểm ô nhiễm "${target.title}" là CÓ RÁC THỰC TẾ?\n\nThao tác này sẽ lưu điểm chính thức lên hệ thống và chuyển trạng thái sang "Trong quá trình xử lý" theo phê duyệt của ${ADMIN_EMAIL}.`
    );
    if (!confirmed) return;

    const verifiedHotspot: WasteHotspot = {
      ...target,
      isPendingVerification: false,
      status: 'in_progress',
      statusText: `Trong quá trình xử lý (Đã xác nhận có rác bởi ban điều phối ${ADMIN_EMAIL})`,
      verifiedBy: ADMIN_EMAIL,
      verifiedAt: new Date().toLocaleString('vi-VN')
    };

    // Move to official hotspots list
    setHotspots((prev) => [verifiedHotspot, ...prev.filter((h) => h.id !== hotspotId)]);
    setPendingHotspots((prev) => prev.filter((p) => p.id !== hotspotId));
    setSelectedHotspot(verifiedHotspot);

    setVerificationFeedback(
      `Đã xác nhận điểm rác thành công bởi ${ADMIN_EMAIL}! Điểm đã được lưu chính thức lên trang web và đang hiển thị trạng thái "Trong quá trình xử lý".`
    );

    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([verifiedHotspot.lat, verifiedHotspot.lng], 13);
    }

    setTimeout(() => {
      setVerificationFeedback(null);
    }, 5000);
  };

  // Reject false report
  const handleRejectHotspot = (hotspotId: string) => {
    const confirmed = window.confirm('Bạn có chắc muốn từ chối hoặc xóa điểm báo cáo này?');
    if (!confirmed) return;
    setPendingHotspots((prev) => prev.filter((p) => p.id !== hotspotId));
    if (selectedHotspot?.id === hotspotId) {
      setSelectedHotspot(null);
    }
  };

  const handleVolunteerSuccess = (data: VolunteerFormData) => {
    setHotspots((prev) =>
      prev.map((h) => {
        if (h.id === data.hotspotId) {
          return {
            ...h,
            volunteersJoined: h.volunteersJoined + 1
          };
        }
        return h;
      })
    );
  };

  return (
    <section id="map" className="py-24 bg-zinc-950 relative border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <MapPin className="w-4 h-4" />
              <span>PHẦN 4 · BẢN ĐỒ CỘNG ĐỒNG GENGREEN</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Bản Đồ Điểm Đen Rác Thải Nhựa &amp; Phê Duyệt Báo Cáo
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-3xl">
              Quy trình tiếp nhận báo cáo điểm rác hai bước: Báo cáo gửi về Gmail <strong>{ADMIN_EMAIL}</strong> ở trạng thái <span className="text-amber-400 font-semibold">Chờ xác nhận</span>. Khi ban điều phối bấm <span className="text-teal-300 font-semibold">Xác nhận có rác</span>, điểm sẽ chính thức lưu lên trang web và hiển thị trạng thái <span className="text-sky-400 font-semibold">Trong quá trình xử lý</span>.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <span className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-rose-400" />
              <span>Admin: <strong className="text-white font-mono">{ADMIN_EMAIL}</strong></span>
            </span>
          </div>
        </div>

        {/* Global Feedback Banner */}
        {verificationFeedback && (
          <div className="mb-6 p-4 rounded-2xl bg-teal-950/90 border border-teal-500/60 text-teal-200 text-xs flex items-center gap-3 animate-fadeIn shadow-xl">
            <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
            <div className="leading-relaxed">
              <strong className="text-white block font-bold">Xác nhận thành công!</strong>
              <span>{verificationFeedback}</span>
            </div>
          </div>
        )}

        {/* 1. KHU VỰC CHỜ XÁC NHẬN (PENDING VERIFICATION PORTAL) */}
        <div className="mb-8 bg-zinc-900/90 rounded-2xl border border-amber-500/40 p-5 backdrop-blur-md shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <span>Trang Chờ Xác Nhận Điểm Rác Mới</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold animate-pulse">
                    {pendingHotspots.length} điểm đang chờ
                  </span>
                </h3>
                <p className="text-[11px] text-zinc-400">
                  Các điểm rác do người dân gửi báo cáo, đã chuyển tiếp thông báo về Gmail: <strong className="text-zinc-300 font-mono">{ADMIN_EMAIL}</strong>
                </p>
              </div>
            </div>

            <div className="text-[11px] text-amber-300 bg-amber-950/60 px-3 py-1 rounded-xl border border-amber-500/30 flex items-center gap-1.5 self-start sm:self-auto">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Chỉ quản trị viên hoặc Gmail {ADMIN_EMAIL} duyệt mới lưu lên web</span>
            </div>
          </div>

          {/* Pending List Cards */}
          {pendingHotspots.length === 0 ? (
            <div className="py-6 text-center text-xs text-zinc-500">
              Hiện không có điểm rác nào đang chờ xác nhận. Mọi báo cáo mới sẽ xuất hiện tại đây!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {pendingHotspots.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-zinc-950/80 border border-amber-500/30 flex flex-col justify-between hover:border-amber-500/60 transition-all shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 border border-amber-500/40 text-amber-300 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-400" />
                        <span>⏳ CHỜ XÁC NHẬN</span>
                      </span>
                      <span className="text-[10px] text-zinc-500 font-mono">{item.reportedAt}</span>
                    </div>

                    <div className="flex items-start gap-3 mb-2.5">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-14 h-14 rounded-lg object-cover border border-zinc-700 shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-white truncate">{item.title}</h4>
                        <p className="text-[11px] text-zinc-400 truncate">📍 {item.locationName}</p>
                        <p className="text-[10px] text-zinc-500 font-mono mt-0.5">Tọa độ: {item.lat}, {item.lng}</p>
                      </div>
                    </div>

                    <p className="text-[11px] text-zinc-300 line-clamp-2 leading-relaxed mb-3">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-zinc-800 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => handleVerifyHotspot(item.id)}
                      className="flex-1 py-2 px-3 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 shadow-md flex items-center justify-center gap-1.5 transition-all hover:scale-105"
                      title="Bấm để xác nhận có rác thực tế, lưu lên trang web và chuyển sang trạng thái Trong quá trình xử lý"
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Xác nhận có rác</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRejectHotspot(item.id)}
                      className="p-2 rounded-xl bg-zinc-800 hover:bg-rose-950 text-zinc-400 hover:text-rose-400 border border-zinc-700 hover:border-rose-500/50 transition-colors"
                      title="Từ chối hoặc xóa báo cáo sai"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => panToHotspot(item)}
                      className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700"
                      title="Xem vị trí trên bản đồ"
                    >
                      <Eye className="w-3.5 h-3.5 text-amber-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 2. Interactive Map Container & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
          {/* Main Map Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Filter buttons & Map status bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 bg-zinc-900/90 p-3 rounded-2xl border border-zinc-800">
              <div className="flex items-center gap-1.5">
                <Filter className="w-4 h-4 text-zinc-400" />
                <span className="text-xs font-semibold text-zinc-300">Lọc Marker:</span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  onClick={() => setFilterSeverity('all')}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    filterSeverity === 'all'
                      ? 'bg-zinc-800 text-white border border-zinc-600'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Tất cả ({hotspots.length + pendingHotspots.length})
                </button>

                <button
                  onClick={() => setFilterSeverity('in_progress')}
                  className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                    filterSeverity === 'in_progress'
                      ? 'bg-sky-950/80 text-sky-300 border border-sky-500/50'
                      : 'text-zinc-400 hover:text-sky-300'
                  }`}
                >
                  <span>⚙️ Đang xử lý ({hotspots.filter((h) => h.status === 'in_progress' || h.statusText.includes('quá trình xử lý')).length})</span>
                </button>

                <button
                  onClick={() => setFilterSeverity('pending')}
                  className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                    filterSeverity === 'pending'
                      ? 'bg-amber-950/80 text-amber-300 border border-amber-500/50'
                      : 'text-zinc-400 hover:text-amber-300'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span>⏳ Chờ xác nhận ({pendingHotspots.length})</span>
                </button>

                <button
                  onClick={() => setFilterSeverity('cleaned')}
                  className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                    filterSeverity === 'cleaned'
                      ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/50'
                      : 'text-zinc-400 hover:text-emerald-400'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>🟢 Đã dọn ({hotspots.filter((h) => h.severity === 'cleaned').length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (mapInstanceRef.current) {
                      mapInstanceRef.current.invalidateSize();
                      mapInstanceRef.current.flyTo([15.8, 107.5], 6);
                    }
                  }}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-zinc-800 hover:bg-emerald-600 text-zinc-300 hover:text-white border border-zinc-700 transition-colors flex items-center gap-1.5 shadow-sm"
                  title="Căn giữa bản đồ Việt Nam"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Căn giữa</span>
                </button>
              </div>
            </div>

            {/* Map Theme Selection Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-zinc-900/80 rounded-xl border border-zinc-800 text-xs">
              <div className="flex items-center gap-1.5 text-zinc-300 font-semibold">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                <span>Nền bản đồ:</span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setMapTheme('voyager')}
                  className={`px-2.5 py-1 rounded-lg text-xs transition-all ${
                    mapTheme === 'voyager'
                      ? 'bg-emerald-600 text-white font-bold shadow'
                      : 'text-zinc-400 hover:text-white bg-zinc-800/80'
                  }`}
                >
                  ☀️ Sáng (Mặc định)
                </button>
                <button
                  type="button"
                  onClick={() => setMapTheme('google_streets')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                    mapTheme === 'google_streets'
                      ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
                      : 'text-zinc-300 hover:text-white bg-zinc-800/80'
                  }`}
                >
                  <span>🗺️ Google Maps</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMapTheme('google_hybrid')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                    mapTheme === 'google_hybrid'
                      ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
                      : 'text-zinc-300 hover:text-white bg-zinc-800/80'
                  }`}
                >
                  <span>🛰️ Google Vệ Tinh</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMapTheme('dark')}
                  className={`px-2.5 py-1 rounded-lg text-xs transition-all ${
                    mapTheme === 'dark'
                      ? 'bg-emerald-600 text-white font-bold shadow'
                      : 'text-zinc-400 hover:text-white bg-zinc-800/80'
                  }`}
                >
                  🌙 Tối (Eco Dark)
                </button>
              </div>
            </div>

            {/* Actual Leaflet Map Canvas */}
            <div className="relative rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl h-[480px] bg-zinc-900">
              <div ref={mapContainerRef} className="w-full h-full z-0" />

              {/* Map prompt */}
              <div className="absolute top-3 left-3 z-10 px-3 py-1.5 rounded-lg bg-zinc-950/85 border border-zinc-800 text-[11px] text-zinc-300 backdrop-blur-md shadow-md flex items-center gap-1.5 pointer-events-none">
                <Info className="w-3.5 h-3.5 text-emerald-400" />
                <span>Click lên bản đồ để chọn tọa độ hoặc ghim vị trí điểm rác mới</span>
              </div>

              {/* City quick buttons on map */}
              <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center gap-1.5 overflow-x-auto pb-1 pointer-events-auto">
                <span className="text-[10px] text-zinc-300 font-semibold px-2 py-1 rounded bg-zinc-950/90 border border-zinc-800 backdrop-blur-md shrink-0">
                  Khu vực:
                </span>
                {CITY_PRESETS.map((city) => (
                  <button
                    key={city.name}
                    onClick={() => updatePinCoordinates(city.lat, city.lng, city.name)}
                    className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-zinc-900/90 hover:bg-emerald-600 text-zinc-300 hover:text-white border border-zinc-700/80 transition-all shrink-0 backdrop-blur-md shadow-sm"
                  >
                    {city.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Focused hotspot preview bar below map */}
            {selectedHotspot && (
              <div className="bg-zinc-900/90 rounded-2xl border border-emerald-500/40 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedHotspot.imageUrl}
                    alt={selectedHotspot.title}
                    className="w-16 h-16 rounded-xl object-cover border border-zinc-700 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {selectedHotspot.isPendingVerification ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 border border-amber-500/50 text-amber-300">
                          ⏳ CHỜ XÁC NHẬN
                        </span>
                      ) : selectedHotspot.status === 'in_progress' || selectedHotspot.statusText.includes('quá trình xử lý') ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-950 border border-sky-500/50 text-sky-300">
                          ⚙️ TRONG QUÁ TRÌNH XỬ LÝ
                        </span>
                      ) : null}
                      <h4 className="text-sm font-bold text-white">{selectedHotspot.title}</h4>
                    </div>

                    <p className="text-xs text-zinc-400">📍 {selectedHotspot.locationName}</p>
                    <span className="text-[11px] text-zinc-300 block mt-0.5 font-medium">
                      {selectedHotspot.statusText}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  {selectedHotspot.isPendingVerification ? (
                    <button
                      onClick={() => handleVerifyHotspot(selectedHotspot.id)}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-zinc-950 shadow-md flex items-center gap-1.5 transition-all hover:scale-105"
                      title="Xác nhận có rác thực tế để chuyển sang trạng thái Trong quá trình xử lý"
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Xác nhận có rác</span>
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => handleToggleUpvote(selectedHotspot.id)}
                        className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-colors ${
                          selectedHotspot.hasUpvoted
                            ? 'bg-rose-950/80 text-rose-400 border-rose-500/60'
                            : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:text-white'
                        }`}
                      >
                        <Heart
                          className={`w-3.5 h-3.5 ${
                            selectedHotspot.hasUpvoted ? 'fill-rose-500 text-rose-500' : ''
                          }`}
                        />
                        <span>{selectedHotspot.upvotes}</span>
                      </button>

                      <button
                        onClick={() => setActivityDetailHotspot(selectedHotspot)}
                        className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-emerald-400 border border-emerald-500/40 transition-all"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Kế hoạch dọn</span>
                      </button>

                      <button
                        onClick={() => setVolunteerModalHotspot(selectedHotspot)}
                        className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-md transition-all"
                      >
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>Đăng ký tham gia</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Crowdsourcing Report Form Column (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-zinc-900/95 rounded-2xl border border-zinc-800 p-6 backdrop-blur-md shadow-2xl">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    <Send className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Biểu mẫu Đóng góp Điểm rác</h3>
                    <p className="text-xs text-amber-400">Gửi duyệt về Gmail {ADMIN_EMAIL}</p>
                  </div>
                </div>
              </div>

              {showSuccessToast && (
                <div className="mb-4 p-3.5 rounded-xl bg-amber-950/80 border border-amber-500/60 text-amber-200 text-xs flex items-start gap-2.5 animate-fadeIn shadow-lg">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="leading-snug">
                    <strong className="text-white block font-bold mb-0.5">Báo cáo đã tiếp nhận!</strong>
                    <span>{toastMessage}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmitReport} className="space-y-4 text-xs">
                {/* 1. Tên địa điểm */}
                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">
                    1. Tên địa điểm / Khu vực rác ứ đọng *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Chân cầu Tham Lương, Kênh Lương, Quận Tân Bình..."
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                {/* Tọa độ GPS & ĐỊNH VỊ BẢN ĐỒ TRỰC TIẾP TRONG PHẦN BÁO CÁO */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-semibold text-zinc-300 flex items-center gap-1.5">
                      <Crosshair className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Bản đồ chọn tọa độ GPS *</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleDetectGPS}
                      disabled={gpsLoading}
                      className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-medium transition-colors bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30"
                    >
                      <Navigation className={`w-3 h-3 ${gpsLoading ? 'animate-spin' : ''}`} />
                      <span>{gpsLoading ? 'Đang định vị...' : 'GPS tự động'}</span>
                    </button>
                  </div>

                  <input
                    type="text"
                    required
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    placeholder="Vị trí chi tiết..."
                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-700 text-white placeholder:text-zinc-500 mb-2 focus:outline-none focus:border-emerald-500"
                  />

                  {/* MINI-MAP IN FORM */}
                  <div className="relative rounded-xl overflow-hidden border border-zinc-700 h-36 bg-zinc-950 mb-2">
                    <div ref={formMapContainerRef} className="w-full h-full z-0" />
                    <div className="absolute bottom-1.5 left-1.5 z-10 px-2 py-0.5 rounded bg-zinc-950/90 text-[10px] text-zinc-300 border border-zinc-800">
                      Kéo thả ghim đỏ 📍 để chỉnh vị trí
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-zinc-400 bg-zinc-950/60 px-3 py-1.5 rounded-lg border border-zinc-800/80">
                    <span>Tọa độ ghim:</span>
                    <strong className="text-emerald-400 font-mono">
                      {formLat}, {formLng}
                    </strong>
                  </div>
                </div>

                {/* 2. Mức độ ô nhiễm */}
                <div>
                  <label className="block font-semibold text-zinc-300 mb-1.5">
                    2. Mức độ ô nhiễm rác thải nhựa
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setFormSeverity('moderate');
                        setFormScale('Nhỏ');
                      }}
                      className={`p-2 rounded-xl border text-center transition-all ${
                        formScale === 'Nhỏ'
                          ? 'bg-amber-950/70 border-amber-500/70 text-amber-300 font-bold'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                      }`}
                    >
                      Quy mô Nhỏ
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setFormSeverity('moderate');
                        setFormScale('Vừa');
                      }}
                      className={`p-2 rounded-xl border text-center transition-all ${
                        formScale === 'Vừa'
                          ? 'bg-amber-950/70 border-amber-500/70 text-amber-300 font-bold'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                      }`}
                    >
                      Quy mô Vừa
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setFormSeverity('critical');
                        setFormScale('Điểm đen tự phát lớn');
                      }}
                      className={`p-2 rounded-xl border text-center transition-all ${
                        formScale === 'Điểm đen tự phát lớn'
                          ? 'bg-rose-950/70 border-rose-500/70 text-rose-300 font-bold'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                      }`}
                    >
                      Điểm đen Lớn
                    </button>
                  </div>
                </div>

                {/* 3. Tải lên hình ảnh */}
                <div>
                  <label className="block font-semibold text-zinc-300 mb-1.5">
                    3. Hình ảnh chụp thực tế từ hiện trường *
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="flex-1 cursor-pointer flex items-center justify-center gap-2 p-3 rounded-xl bg-zinc-950 border border-dashed border-zinc-700 hover:border-emerald-500 transition-colors text-zinc-400 hover:text-zinc-200">
                      <Camera className="w-4 h-4 text-emerald-400" />
                      <span>Chọn ảnh hoặc Chụp trực tiếp</span>
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>

                    {/* Preview Thumbnail */}
                    {formImage && (
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-zinc-700 shrink-0">
                        <img
                          src={formImage}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* 4. Mô tả ngắn */}
                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">
                    4. Mô tả hiện trạng rác thải nhựa *
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Ví dụ: Rác thải nhựa, túi nilon, hộp xốp dồn ứ chân cầu, gây nghẹt dòng chảy và bốc mùi..."
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                  />
                </div>

                {/* Target email note */}
                <div className="p-3 rounded-xl bg-amber-950/50 border border-amber-500/30 text-[11px] text-amber-200 flex items-start gap-2">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="leading-snug">
                    <span>Báo cáo sẽ được gửi về Gmail xác thực: </span>
                    <strong className="text-white font-mono">{ADMIN_EMAIL}</strong>.
                    <span className="block text-zinc-400 mt-0.5">
                      Sau khi xác nhận có rác, điểm sẽ lưu chính thức lên web với trạng thái &quot;Trong quá trình xử lý&quot;.
                    </span>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-amber-500 via-emerald-500 to-teal-500 hover:from-amber-400 hover:to-teal-400 text-zinc-950 shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Gửi Báo Cáo Chờ Xác Nhận</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* 3. Danh sách Điểm Rác Thực Tế & Đang Xử Lý (Community Feed) */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span>Danh Sách Điểm Đen Rác Thải &amp; Đang Xử Lý</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Thời gian thực
                </span>
              </h3>
              <p className="text-xs text-zinc-400">
                Các điểm rác đã được xác nhận thực tế và đang trong quá trình phối hợp xử lý, ra quân dọn sạch
              </p>
            </div>

            {onNavigateToRegistry && (
              <button
                onClick={onNavigateToRegistry}
                className="self-start sm:self-auto px-4 py-2 rounded-xl text-xs font-bold bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 hover:text-white transition-all flex items-center gap-2 shadow-sm"
              >
                <UserPlus className="w-4 h-4 text-emerald-400" />
                <span>Xem Trang Tổng Hợp Người Đã Đăng Ký Dọn Rác ↗</span>
              </button>
            )}
          </div>

          {/* Cards Feed Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedHotspots.map((item) => {
              const isSelected = selectedHotspot?.id === item.id;
              const isPending = item.isPendingVerification === true;
              const isInProgress =
                item.status === 'in_progress' || item.statusText.includes('quá trình xử lý');

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    panToHotspot(item);
                    if (!isPending) setActivityDetailHotspot(item);
                  }}
                  className={`bg-zinc-900/80 rounded-2xl border p-5 flex flex-col justify-between transition-all duration-300 cursor-pointer hover:-translate-y-1 group ${
                    isSelected
                      ? 'border-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.2)] bg-zinc-900'
                      : isPending
                      ? 'border-amber-500/50 hover:border-amber-400'
                      : isInProgress
                      ? 'border-sky-500/50 hover:border-sky-400'
                      : 'border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div>
                    {/* Image & Status Badge */}
                    <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-4 border border-zinc-800">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />

                      {/* Prominent Status Badge */}
                      <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md text-[11px] font-bold border backdrop-blur-md shadow-md">
                        {isPending ? (
                          <span className="text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/50">
                            ⏳ Chờ xác nhận
                          </span>
                        ) : isInProgress ? (
                          <span className="text-sky-300 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-500/50">
                            ⚙️ Trong quá trình xử lý
                          </span>
                        ) : item.severity === 'cleaned' ? (
                          <span className="text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/50">
                            🟢 Đã dọn dẹp
                          </span>
                        ) : (
                          <span className="text-rose-300 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-500/50">
                            🔴 Điểm đen rác lớn
                          </span>
                        )}
                      </div>

                      <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded bg-zinc-950/85 text-[10px] text-zinc-300 backdrop-blur-sm border border-zinc-800">
                          {item.reportedAt}
                        </span>
                      </div>
                    </div>

                    <h4 className="text-base font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">
                      {item.title}
                    </h4>

                    <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-2">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{item.locationName}</span>
                    </div>

                    <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed mb-3">
                      {item.description}
                    </p>

                    {item.verifiedBy && (
                      <div className="mb-2.5 px-2.5 py-1 rounded-lg bg-sky-950/50 border border-sky-500/30 text-[10px] text-sky-200 flex items-center gap-1.5">
                        <ShieldCheck className="w-3 h-3 text-sky-400 shrink-0" />
                        <span>Xác nhận bởi: <strong className="font-mono">{item.verifiedBy}</strong></span>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-zinc-800">
                    {isPending ? (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleVerifyHotspot(item.id);
                          }}
                          className="flex-1 py-2 px-3 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-zinc-950 flex items-center justify-center gap-1.5 shadow"
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Xác nhận có rác</span>
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRejectHotspot(item.id);
                          }}
                          className="p-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-rose-400 border border-zinc-700"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div>
                        {/* Progress */}
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-[11px] mb-1">
                            <span className="text-zinc-400">Lực lượng dọn dẹp:</span>
                            <span className="font-semibold text-emerald-400">
                              {item.volunteersJoined} / {item.volunteersNeeded} người
                            </span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                            <div
                              style={{
                                width: `${Math.min(
                                  100,
                                  (item.volunteersJoined / item.volunteersNeeded) * 100
                                )}%`
                              }}
                              className={`h-full rounded-full transition-all ${
                                item.severity === 'cleaned' ? 'bg-emerald-400' : 'bg-teal-500'
                              }`}
                            />
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleUpvote(item.id);
                            }}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                              item.hasUpvoted
                                ? 'bg-rose-950/80 text-rose-400 border-rose-500/60'
                                : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:text-white'
                            }`}
                          >
                            <Heart
                              className={`w-3.5 h-3.5 ${
                                item.hasUpvoted ? 'fill-rose-500 text-rose-500' : ''
                              }`}
                            />
                            <span>{item.upvotes}</span>
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setVolunteerModalHotspot(item);
                            }}
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-zinc-950 transition-colors shadow"
                          >
                            <UserPlus className="w-3.5 h-3.5" />
                            <span>Đăng ký tham gia</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Cleanup Activity Detail Modal */}
      <CleanupActivityModal
        hotspot={activityDetailHotspot}
        onClose={() => setActivityDetailHotspot(null)}
        onOpenVolunteer={(h) => setVolunteerModalHotspot(h)}
        onToggleUpvote={handleToggleUpvote}
      />

      {/* Volunteer Modal */}
      <VolunteerModal
        hotspot={volunteerModalHotspot}
        onClose={() => setVolunteerModalHotspot(null)}
        onSuccess={handleVolunteerSuccess}
      />
    </section>
  );
};

export default CrowdsourcedMapSection;
