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
  RotateCcw
} from 'lucide-react';
import L from 'leaflet';

interface CrowdsourcedMapSectionProps {
  onHotspotsCountChange?: (count: number) => void;
}

const CITY_PRESETS = [
  { name: 'Hà Nội', lat: 21.0285, lng: 105.8542 },
  { name: 'Đà Nẵng', lat: 16.0544, lng: 108.2022 },
  { name: 'TP.HCM', lat: 10.7769, lng: 106.7009 },
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
  onHotspotsCountChange
}) => {
  const [mapTheme, setMapTheme] = useState<keyof typeof TILE_PROVIDERS>('voyager');
  const currentTileLayerRef = useRef<L.TileLayer | null>(null);

  const [hotspots, setHotspots] = useState<WasteHotspot[]>(() => {
    const saved = localStorage.getItem('gengreen_hotspots');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_HOTSPOTS;
      }
    }
    return INITIAL_HOTSPOTS;
  });

  const [filterSeverity, setFilterSeverity] = useState<'all' | 'critical' | 'moderate' | 'cleaned'>('all');
  const [selectedHotspot, setSelectedHotspot] = useState<WasteHotspot | null>(null);
  const [volunteerModalHotspot, setVolunteerModalHotspot] = useState<WasteHotspot | null>(null);
  const [activityDetailHotspot, setActivityDetailHotspot] = useState<WasteHotspot | null>(null);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formLocation, setFormLocation] = useState('Quận 1, TP. Hồ Chí Minh');
  const [formLat, setFormLat] = useState<number>(10.7769);
  const [formLng, setFormLng] = useState<number>(106.7009);
  const [formSeverity, setFormSeverity] = useState<'critical' | 'moderate'>('critical');
  const [formScale, setFormScale] = useState<'Nhỏ' | 'Vừa' | 'Điểm đen tự phát lớn'>('Điểm đen tự phát lớn');
  const [formDescription, setFormDescription] = useState('');
  const [formImage, setFormImage] = useState<string>('https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=700&q=80');

  // Main Map Refs
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  // Report Form Mini-Map Refs
  const formMapContainerRef = useRef<HTMLDivElement>(null);
  const formMapInstanceRef = useRef<L.Map | null>(null);
  const formMarkerRef = useRef<L.Marker | null>(null);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('gengreen_hotspots', JSON.stringify(hotspots));
    if (onHotspotsCountChange) {
      onHotspotsCountChange(hotspots.length);
    }
  }, [hotspots, onHotspotsCountChange]);

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

    // Initial tile layer (CartoDB Voyager: 100% reliable on Netlify, powered by OSM data)
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
      setFormLocation(`Tọa độ: ${lat}, ${lng}`);

      // Sync form mini map
      if (formMapInstanceRef.current && formMarkerRef.current) {
        formMarkerRef.current.setLatLng([lat, lng]);
        formMapInstanceRef.current.panTo([lat, lng]);
      }
    });

    // Ensure map tiles render crisply whenever container is mounted or resized
    const resizeTimer1 = setTimeout(() => map.invalidateSize(), 100);
    const resizeTimer2 = setTimeout(() => map.invalidateSize(), 350);
    const resizeTimer3 = setTimeout(() => map.invalidateSize(), 800);

    const handleResize = () => map.invalidateSize();
    window.addEventListener('resize', handleResize);

    // IntersectionObserver to redraw tiles as soon as map scrolls into viewport
    let observer: IntersectionObserver | null = null;
    if (mapContainerRef.current && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              map.invalidateSize();
              setTimeout(() => map.invalidateSize(), 200);
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(mapContainerRef.current);
    }

    return () => {
      clearTimeout(resizeTimer1);
      clearTimeout(resizeTimer2);
      clearTimeout(resizeTimer3);
      window.removeEventListener('resize', handleResize);
      if (observer) observer.disconnect();
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Main Map Tile Layer when mapTheme changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    if (currentTileLayerRef.current) {
      mapInstanceRef.current.removeLayer(currentTileLayerRef.current);
    }
    const provider = TILE_PROVIDERS[mapTheme];
    const newTile = L.tileLayer(provider.url, provider.options).addTo(mapInstanceRef.current);
    newTile.bringToBack();
    currentTileLayerRef.current = newTile;
    mapInstanceRef.current.invalidateSize();
  }, [mapTheme]);

  // ==============================================================
  // 2. REPORT FORM MINI-MAP INITIALIZATION (Bản đồ trong phần báo cáo)
  // ==============================================================
  useEffect(() => {
    if (!formMapContainerRef.current) return;
    if (formMapInstanceRef.current) return;

    const miniMap = L.map(formMapContainerRef.current, {
      center: [formLat, formLng],
      zoom: 13,
      minZoom: 5,
      maxZoom: 18,
      scrollWheelZoom: false,
      zoomControl: true
    });

    // Highly reliable Fastly CDN tiles for form mini-map
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(miniMap);

    // Form mini-map intersection observer
    let formObserver: IntersectionObserver | null = null;
    if (formMapContainerRef.current && 'IntersectionObserver' in window) {
      formObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              miniMap.invalidateSize();
              setTimeout(() => miniMap.invalidateSize(), 200);
            }
          });
        },
        { threshold: 0.1 }
      );
      formObserver.observe(formMapContainerRef.current);
    }

    // Custom pulsing pin for report target
    const pinIcon = L.divIcon({
      className: 'custom-leaflet-marker',
      html: `
        <div style="position: relative; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center;">
          <div style="position: absolute; width: 100%; height: 100%; border-radius: 50%; background-color: #ef4444; opacity: 0.35; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="width: 24px; height: 24px; border-radius: 50%; background-color: #ef4444; border: 2.5px solid #ffffff; box-shadow: 0 0 12px rgba(239, 68, 68, 0.8); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 11px; font-weight: bold;">
            📍
          </div>
        </div>
      `,
      iconSize: [34, 34],
      iconAnchor: [17, 17]
    });

    const marker = L.marker([formLat, formLng], {
      icon: pinIcon,
      draggable: true
    }).addTo(miniMap);

    formMarkerRef.current = marker;

    // Drag marker on mini map
    marker.on('dragend', (event) => {
      const position = event.target.getLatLng();
      const lat = parseFloat(position.lat.toFixed(5));
      const lng = parseFloat(position.lng.toFixed(5));
      setFormLat(lat);
      setFormLng(lng);
      setFormLocation(`Tọa độ: ${lat}, ${lng}`);

      if (mapInstanceRef.current) {
        mapInstanceRef.current.panTo([lat, lng]);
      }
    });

    // Click anywhere on mini map to reposition marker
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

    // Refresh mini-map size
    setTimeout(() => miniMap.invalidateSize(), 200);
    setTimeout(() => miniMap.invalidateSize(), 600);

    return () => {
      miniMap.remove();
      formMapInstanceRef.current = null;
    };
  }, []);

  // Sync Form Mini-Map when formLat/formLng change programmatically (e.g. via GPS or Preset)
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
      mapInstanceRef.current.flyTo([lat, lng], 12);
      setTimeout(() => mapInstanceRef.current?.invalidateSize(), 150);
    }
  };

  // Update Main Map Markers on filter or hotspots change
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;
    const markersGroup = markersLayerRef.current;
    markersGroup.clearLayers();

    const filtered =
      filterSeverity === 'all'
        ? hotspots
        : hotspots.filter((h) => h.severity === filterSeverity);

    filtered.forEach((hotspot) => {
      const color =
        hotspot.severity === 'critical'
          ? '#ef4444' // Red 🔴
          : hotspot.severity === 'moderate'
          ? '#eab308' // Yellow 🟡
          : '#10b981'; // Green 🟢

      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="position: relative; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;">
            <div style="position: absolute; width: 100%; height: 100%; border-radius: 50%; background-color: ${color}; opacity: 0.25;"></div>
            <div style="width: 22px; height: 22px; border-radius: 50%; background-color: ${color}; border: 2.5px solid #ffffff; box-shadow: 0 0 10px rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 10px; font-weight: bold;">
              ${hotspot.severity === 'cleaned' ? '✓' : '!'}
            </div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const marker = L.marker([hotspot.lat, hotspot.lng], { icon: customIcon });

      const popupContent = `
        <div style="font-family: inherit; color: #ffffff; padding: 4px; max-width: 220px;">
          <strong style="font-size: 13px; display: block; margin-bottom: 2px; color: #ffffff;">${hotspot.title}</strong>
          <div style="font-size: 11px; color: #a1a1aa; margin-bottom: 4px;">📍 ${hotspot.locationName}</div>
          <div style="font-size: 10px; font-weight: 600; color: ${color}; margin-bottom: 4px;">
            ${
              hotspot.severity === 'critical'
                ? '🔴 Ô nhiễm nghiêm trọng'
                : hotspot.severity === 'moderate'
                ? '🟡 Ô nhiễm trung bình'
                : '🟢 Đã dọn dẹp xong'
            }
          </div>
          <p style="font-size: 11px; line-height: 1.3; color: #d4d4d8; margin: 0 0 6px 0;">${hotspot.description.slice(0, 80)}...</p>
          <div style="border-top: 1px solid #3f3f46; padding-top: 6px; display: flex; flex-direction: column; gap: 4px;">
            <a href="https://www.google.com/maps/dir/?api=1&destination=${hotspot.lat},${hotspot.lng}" target="_blank" rel="noopener noreferrer" style="color: #60a5fa; font-weight: 600; text-decoration: underline; font-size: 11px; display: flex; align-items: center; gap: 4px;">
              🧭 Chỉ đường bằng Google Maps ↗
            </a>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <a href="https://www.google.com/maps/search/?api=1&query=${hotspot.lat},${hotspot.lng}" target="_blank" rel="noopener noreferrer" style="color: #38bdf8; font-size: 11px;">
                📍 Xem trên Google Maps
              </a>
              <a href="https://www.openstreetmap.org/?mlat=${hotspot.lat}&mlon=${hotspot.lng}#map=16/${hotspot.lat}/${hotspot.lng}" target="_blank" rel="noopener noreferrer" style="color: #34d399; font-size: 11px;">
                🗺️ OSM
              </a>
            </div>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);
      marker.on('click', () => {
        setSelectedHotspot(hotspot);
      });

      markersGroup.addLayer(marker);
    });
  }, [hotspots, filterSeverity]);

  // Center map on specific hotspot
  const panToHotspot = (hotspot: WasteHotspot) => {
    setSelectedHotspot(hotspot);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([hotspot.lat, hotspot.lng], 13, {
        duration: 1.2
      });
    }
  };

  // Upvote / "Tôi cũng thấy điểm này"
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
      (err) => {
        setGpsLoading(false);
        alert('Không thể lấy vị trí hiện tại. Vui lòng cấp quyền vị trí hoặc click chọn trực tiếp trên bản đồ.');
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

  // Submit Report
  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formLocation.trim() || !formDescription.trim()) {
      alert('Vui lòng điền đầy đủ tên địa điểm, vị trí và mô tả ngắn!');
      return;
    }

    const newHotspot: WasteHotspot = {
      id: `hs-${Date.now()}`,
      title: formTitle,
      locationName: formLocation,
      lat: formLat,
      lng: formLng,
      severity: formSeverity,
      description: `${formDescription} (Quy mô: ${formScale})`,
      imageUrl: formImage,
      reportedAt: 'Hôm nay',
      reportedBy: 'Người dân địa phương',
      upvotes: 1,
      hasUpvoted: true,
      volunteersNeeded: formSeverity === 'critical' ? 25 : 10,
      volunteersJoined: 1,
      statusText: 'Đã tiếp nhận báo cáo · Chờ duyệt ra quân',
      cleanupDetails: {
        eventDate: 'Dự kiến vào cuối tuần tới (07:30 - 11:30)',
        meetingPoint: formLocation,
        coordinatorName: 'Nguyễn Ngọc Như Ý (Field Coordinator GENGREEN)',
        coordinatorContact: '0934.567.890 / Zalo: GENGREEN Vietnam',
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

    setHotspots((prev) => [newHotspot, ...prev]);
    setSelectedHotspot(newHotspot);
    setShowSuccessToast(true);

    // Forward report data to target email
    try {
      fetch('https://formsubmit.co/ajax/26162120@student.hcmute.edu.vn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `[GENGREEN] Báo cáo điểm đen rác thải: ${formTitle}`,
          _template: 'table',
          _captcha: 'false',
          'Tên điểm rác': formTitle,
          'Địa chỉ / Vị trí': formLocation,
          'Tọa độ GPS': `${formLat}, ${formLng}`,
          'Mức độ': formSeverity === 'critical' ? '🔴 Điểm đen rác lớn' : '🟡 Ô nhiễm trung bình',
          'Quy mô rác': formScale,
          'Mô tả hiện trạng': formDescription,
          'Thời gian': new Date().toLocaleString('vi-VN'),
          'Hệ thống tiếp nhận': 'GENGREEN ECO-ACTION -> 26162120@student.hcmute.edu.vn'
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
    }, 4000);
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

  const filteredHotspots =
    filterSeverity === 'all'
      ? hotspots
      : hotspots.filter((h) => h.severity === filterSeverity);

  return (
    <section id="map" className="py-24 bg-zinc-950 relative border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <MapPin className="w-4 h-4" />
              <span>PHẦN 4 · BẢN ĐỒ CỘNG ĐỒNG GENGREEN</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Bản đồ Tương tác &amp; Báo cáo Điểm đen Rác thải Nhựa
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-3xl">
              Nền tảng mở cho phép người dân định vị GPS, xem bản đồ trực tiếp ngay trong biểu mẫu báo cáo, gửi ảnh thực tế và kết nối mạng lưới tình nguyện viên làm sạch trên khắp Việt Nam.
            </p>
          </div>

          <a
            href="https://www.openstreetmap.org"
            target="_blank"
            rel="noopener noreferrer"
            className="self-start md:self-auto px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500/60 text-xs text-zinc-300 hover:text-emerald-400 transition-all flex items-center gap-2 shadow-sm flex-shrink-0"
            title="Truy cập kho dữ liệu địa lý mở OpenStreetMap"
          >
            <span>Dữ liệu nền OpenStreetMap</span>
            <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
          </a>
        </div>

        {/* 1. Mạch hoạt động của tính năng (Visual Workflow Banner) */}
        <div className="mb-12 bg-zinc-900/90 rounded-2xl border border-zinc-800 p-6 backdrop-blur-md shadow-xl">
          <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Quy trình Xử lý Điểm rác từ Báo cáo đến Dọn dẹp sạch sẽ</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/80 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xs flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="text-xs font-bold text-white mb-1">Chụp ảnh &amp; Định vị GPS</h4>
                <p className="text-[11px] text-zinc-400">Người dân phát hiện điểm rác, xem bản đồ và lấy tọa độ GPS.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/80 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center font-bold text-xs flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="text-xs font-bold text-white mb-1">Gửi Form Báo Cáo trên Web</h4>
                <p className="text-[11px] text-zinc-400">Tải ảnh hiện trường, chọn ghim trên bản đồ và lưu hệ thống.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/80 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold text-xs flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="text-xs font-bold text-white mb-1">Duyệt &amp; Ghim Marker Bản đồ</h4>
                <p className="text-[11px] text-zinc-400">Hiển thị trực quan theo màu đỏ, vàng, xanh trên bản đồ toàn quốc.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/80 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs flex-shrink-0">
                4
              </div>
              <div>
                <h4 className="text-xs font-bold text-white mb-1">Tình nguyện viên Dọn dẹp</h4>
                <p className="text-[11px] text-zinc-400">Cộng đồng bấm đăng ký tham gia dọn dẹp và cập nhật trạng thái sạch.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Interactive Map Container & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
          {/* Main Map Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Filter buttons & Map status bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-zinc-900/90 p-3 rounded-2xl border border-zinc-800">
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
                  Tất cả ({hotspots.length})
                </button>

                <button
                  onClick={() => setFilterSeverity('critical')}
                  className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                    filterSeverity === 'critical'
                      ? 'bg-rose-950/80 text-rose-300 border border-rose-500/50'
                      : 'text-zinc-400 hover:text-rose-400'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span>🔴 Điểm đen ({hotspots.filter((h) => h.severity === 'critical').length})</span>
                </button>

                <button
                  onClick={() => setFilterSeverity('moderate')}
                  className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
                    filterSeverity === 'moderate'
                      ? 'bg-amber-950/80 text-amber-300 border border-amber-500/50'
                      : 'text-zinc-400 hover:text-amber-400'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>🟡 Trung bình ({hotspots.filter((h) => h.severity === 'moderate').length})</span>
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
                  title="Tải lại toàn bộ khung bản đồ và căn giữa"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Làm mới bản đồ</span>
                </button>

                <a
                  href="https://www.google.com/maps/@15.8,107.5,6z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-950/80 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/40 transition-colors flex items-center gap-1.5"
                  title="Mở Google Maps toàn cảnh"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-blue-400" />
                </a>

                <a
                  href="https://www.openstreetmap.org/#map=6/15.8/107.5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-zinc-800 hover:bg-emerald-600 text-zinc-300 hover:text-white border border-zinc-700 transition-colors flex items-center gap-1.5"
                  title="Mở toàn cảnh Việt Nam trên bản đồ mở OpenStreetMap"
                >
                  <span>OpenStreetMap</span>
                  <ExternalLink className="w-3 h-3 text-emerald-400" />
                </a>
              </div>
            </div>

            {/* Map Theme / Layer Selection Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-zinc-900/80 rounded-xl border border-zinc-800 text-xs">
              <div className="flex items-center gap-1.5 text-zinc-300 font-semibold">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                <span>Nền bản đồ:</span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setMapTheme('voyager')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                    mapTheme === 'voyager'
                      ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-500/20'
                      : 'text-zinc-300 hover:text-white bg-zinc-800/80'
                  }`}
                >
                  <span>☀️ Sáng Nét (100% Ổn định)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMapTheme('esri_streets')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                    mapTheme === 'esri_streets'
                      ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-500/20'
                      : 'text-zinc-300 hover:text-white bg-zinc-800/80'
                  }`}
                >
                  <span>🏙️ Đường Phố Esri</span>
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
                <button
                  type="button"
                  onClick={() => setMapTheme('satellite')}
                  className={`px-2.5 py-1 rounded-lg text-xs transition-all ${
                    mapTheme === 'satellite'
                      ? 'bg-emerald-600 text-white font-bold shadow'
                      : 'text-zinc-400 hover:text-white bg-zinc-800/80'
                  }`}
                >
                  🛰️ Vệ Tinh Esri
                </button>
              </div>
            </div>

            {/* Actual Leaflet Map Canvas */}
            <div className="relative rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl h-[480px] bg-zinc-900">
              <div ref={mapContainerRef} className="w-full h-full z-0" />

              {/* Map floating prompt */}
              <div className="absolute top-3 left-3 z-10 px-3 py-1.5 rounded-lg bg-zinc-950/85 border border-zinc-800 text-[11px] text-zinc-300 backdrop-blur-md shadow-md flex items-center gap-1.5 pointer-events-none">
                <Info className="w-3.5 h-3.5 text-emerald-400" />
                <span>Click lên bất kỳ vị trí nào trên bản đồ để chọn tọa độ</span>
              </div>

              {/* City quick buttons on map */}
              <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center gap-1.5 overflow-x-auto pb-1 pointer-events-auto">
                <span className="text-[10px] text-zinc-300 font-semibold px-2 py-1 rounded bg-zinc-950/90 border border-zinc-800 backdrop-blur-md flex-shrink-0">
                  Khu vực:
                </span>
                {CITY_PRESETS.map((city) => (
                  <button
                    key={city.name}
                    onClick={() => updatePinCoordinates(city.lat, city.lng, city.name)}
                    className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-zinc-900/90 hover:bg-emerald-600 text-zinc-300 hover:text-white border border-zinc-700/80 transition-all flex-shrink-0 backdrop-blur-md shadow-sm"
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
                    className="w-14 h-14 rounded-xl object-cover border border-zinc-700 flex-shrink-0"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white">{selectedHotspot.title}</h4>
                    <p className="text-xs text-zinc-400">📍 {selectedHotspot.locationName}</p>
                    <span
                      className={`text-[10px] font-semibold ${
                        selectedHotspot.severity === 'critical'
                          ? 'text-rose-400'
                          : selectedHotspot.severity === 'moderate'
                          ? 'text-amber-400'
                          : 'text-emerald-400'
                      }`}
                    >
                      {selectedHotspot.statusText}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => handleToggleUpvote(selectedHotspot.id)}
                    className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-colors ${
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
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-emerald-400 hover:text-emerald-300 border border-emerald-500/40 transition-all shadow-sm"
                    title="Xem chi tiết hoạt động dọn dẹp"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Chi tiết dọn dẹp</span>
                  </button>

                  <a
                    href={`https://www.openstreetmap.org/?mlat=${selectedHotspot.lat}&mlon=${selectedHotspot.lng}#map=16/${selectedHotspot.lat}/${selectedHotspot.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white border border-zinc-700 transition-colors"
                    title="Mở tọa độ trên OpenStreetMap"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                  </a>

                  <button
                    onClick={() => setVolunteerModalHotspot(selectedHotspot)}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-md transition-all"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Đăng ký dọn dẹp</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Crowdsourcing Report Form Column (5 cols) WITH INTEGRATED FORM MAP */}
          <div className="lg:col-span-5">
            <div className="bg-zinc-900/95 rounded-2xl border border-zinc-800 p-6 backdrop-blur-md shadow-2xl">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    <Send className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Biểu mẫu Đóng góp Điểm rác</h3>
                    <p className="text-xs text-emerald-400">Bản đồ định vị trực quan ngay trong form</p>
                  </div>
                </div>
              </div>

              {showSuccessToast && (
                <div className="mb-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Báo cáo đã gửi thành công! Marker mới đã hiển thị trên bản đồ.</span>
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
                    placeholder="Ví dụ: Cống xả rác bãi bồi ven sông..."
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
                      <span>{gpsLoading ? 'Đang dò...' : 'Lấy GPS tự động'}</span>
                    </button>
                  </div>

                  <input
                    type="text"
                    required
                    placeholder="Quận/Huyện, Tỉnh thành hoặc tên đường..."
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors mb-2"
                  />

                  {/* VISUAL EMBEDDED MAP DIRECTLY IN THE REPORT FORM */}
                  <div className="relative rounded-xl overflow-hidden border border-zinc-700 bg-zinc-950 shadow-inner">
                    <div
                      ref={formMapContainerRef}
                      className="w-full h-44 z-0"
                      style={{ minHeight: '176px' }}
                    />
                    <div className="absolute top-2 left-2 z-10 px-2.5 py-1 rounded bg-zinc-950/85 border border-zinc-800 text-[10px] text-zinc-300 backdrop-blur-md pointer-events-none flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-rose-500" />
                      <span>Kéo thả ghim hoặc click trên bản đồ này</span>
                    </div>
                    <div className="absolute bottom-2 right-2 z-10 px-2 py-0.5 rounded bg-zinc-950/90 text-[10px] text-emerald-400 font-mono border border-zinc-800">
                      {formLat}, {formLng}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-zinc-400 mt-1.5 px-0.5">
                    <span>Kéo thả ghim để chọn tọa độ chính xác</span>
                    <div className="flex items-center gap-2">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${formLat},${formLng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 font-semibold inline-flex items-center gap-1 hover:underline"
                      >
                        <span>Google Maps</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <span>·</span>
                      <a
                        href={`https://www.openstreetmap.org/?mlat=${formLat}&mlon=${formLng}#map=16/${formLat}/${formLng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1 hover:underline"
                      >
                        <span>OSM</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* 2. Mức độ ô nhiễm */}
                <div>
                  <label className="block font-semibold text-zinc-300 mb-1.5">
                    2. Mức độ ô nhiễm &amp; Quy mô rác thải *
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
                    3. Hình ảnh chụp thực tế từ thiết bị *
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
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-zinc-700 flex-shrink-0">
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
                    4. Mô tả ngắn về hiện trạng rác *
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Ví dụ: Rác nhựa tràn lấp lòng kênh, bao bì chai lọ vỡ vụn gây tắc dòng chảy và bốc mùi..."
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-700 text-white placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                  />
                </div>

                {showSuccessToast && (
                  <div className="p-3.5 rounded-xl bg-emerald-950/90 border border-emerald-500/60 text-xs text-emerald-200 flex items-start gap-2 animate-fadeIn shadow-lg">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white">Báo cáo thành công!</p>
                      <p className="text-[11px] text-zinc-300">Điểm rác đã ghim lên bản đồ và gửi thông tin về email ban điều phối: <strong>26162120@student.hcmute.edu.vn</strong></p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Dữ liệu báo cáo sẽ được tiếp nhận và gửi về: <strong className="text-zinc-300">26162120@student.hcmute.edu.vn</strong></span>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Gửi Báo Cáo Lên Bản Đồ &amp; Email</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* 3. Danh sách phản hồi & Trạng thái dọn dẹp (Real-time Community Feed) */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span>Danh sách Phản hồi &amp; Trạng thái Dọn dẹp Thực tế</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Thời gian thực
                </span>
              </h3>
              <p className="text-xs text-zinc-400">
                Bấm vào thẻ để định vị trên bản đồ, thả tim xác nhận hoặc đăng ký gia nhập đội tình nguyện viên
              </p>
            </div>
          </div>

          {/* Cards Feed Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHotspots.map((item) => {
              const isSelected = selectedHotspot?.id === item.id;
              const severityColor =
                item.severity === 'critical'
                  ? 'border-rose-500/60 bg-rose-950/20 text-rose-400'
                  : item.severity === 'moderate'
                  ? 'border-amber-500/60 bg-amber-950/20 text-amber-400'
                  : 'border-emerald-500/60 bg-emerald-950/20 text-emerald-400';

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    panToHotspot(item);
                    setActivityDetailHotspot(item);
                  }}
                  className={`bg-zinc-900/80 rounded-2xl border p-5 flex flex-col justify-between transition-all duration-300 cursor-pointer hover:-translate-y-1 group ${
                    isSelected
                      ? 'border-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.2)] bg-zinc-900'
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
                      <div className={`absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md text-[11px] font-bold border backdrop-blur-md shadow-md ${severityColor}`}>
                        {item.severity === 'critical' && '🔴 Điểm đen lớn'}
                        {item.severity === 'moderate' && '🟡 Ô nhiễm trung bình'}
                        {item.severity === 'cleaned' && '🟢 Đã dọn dẹp'}
                      </div>

                      <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5">
                        <a
                          href={`https://www.openstreetmap.org/?mlat=${item.lat}&mlon=${item.lng}#map=16/${item.lat}/${item.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="px-2 py-0.5 rounded bg-zinc-950/90 hover:bg-emerald-600 text-[10px] text-zinc-300 hover:text-white transition-colors border border-zinc-700/80 flex items-center gap-1 backdrop-blur-sm shadow"
                          title="Mở tọa độ trên OpenStreetMap"
                        >
                          <span>OSM</span>
                          <ExternalLink className="w-2.5 h-2.5 text-emerald-400" />
                        </a>
                        <span className="px-2 py-0.5 rounded bg-zinc-950/85 text-[10px] text-zinc-300 backdrop-blur-sm border border-zinc-800">
                          {item.reportedAt}
                        </span>
                      </div>
                    </div>

                    <h4 className="text-base font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">
                      {item.title}
                    </h4>

                    <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-2">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span className="truncate">{item.locationName}</span>
                    </div>

                    <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed mb-3">
                      {item.description}
                    </p>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        panToHotspot(item);
                        setActivityDetailHotspot(item);
                      }}
                      className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-950/90 via-zinc-900 to-teal-950/90 hover:from-emerald-900 hover:to-teal-900 border border-emerald-500/50 hover:border-emerald-400 text-emerald-300 hover:text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm my-2.5 group/btn"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400 group-hover/btn:scale-110 transition-transform" />
                      <span>Xem chi tiết kế hoạch dọn dẹp</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  <div className="pt-3 border-t border-zinc-800">
                    {/* Volunteer Progress Bar */}
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
                        title="Tôi cũng thấy điểm này"
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
