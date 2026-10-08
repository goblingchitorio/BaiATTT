import { TeamMember, GalleryItem, BeforeAfterItem, SolutionItem, WasteHotspot, DailyPlasticNewsItem } from '../types';

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: "Cao Trần Phúc Thịnh",
    role: "Trưởng nhóm / Full-stack Developer",
    responsibility: "Quản lý tiến độ dự án, kiến trúc hệ thống web, lập trình giao diện chính.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    facebook: "https://facebook.com",
    bioSnippet: "Đam mê công nghệ xanh và phát triển các sản phẩm số tạo tác động tích cực đến cộng đồng và môi trường."
  },
  {
    id: 2,
    name: "Thái Duy Minh",
    role: "Backend & Database Developer",
    responsibility: "Xây dựng API tích hợp bản đồ, quản lý cơ sở dữ liệu địa điểm rác thải.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    facebook: "https://facebook.com",
    bioSnippet: "Chuyên sâu về GIS, tối ưu hóa truy vấn không gian địa lý và kiến trúc hệ thống phục vụ dữ liệu cộng đồng thời gian thực."
  },
  {
    id: 3,
    name: "Phạm Phú Hưng",
    role: "UI/UX Designer & Data Analyst",
    responsibility: "Thiết kế giao diện web, tổng hợp dữ liệu thống kê và trực quan hóa biểu đồ.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    facebook: "https://facebook.com",
    bioSnippet: "Biến các con số thống kê khô khan về ô nhiễm thành những hình ảnh trực quan sinh động, khơi gợi cảm xúc hành động."
  },
  {
    id: 4,
    name: "Đinh Thị Thiên Hương",
    role: "Content Creator & Environmental Researcher",
    responsibility: "Thu thập nội dung thực trạng, viết bài tổng hợp dẫn chứng và giải pháp.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    facebook: "https://facebook.com",
    bioSnippet: "Nhà nghiên cứu sinh thái trẻ nhiệt huyết, kết nối các báo cáo khoa học của UNEP, WWF đến đại chúng bằng ngôn từ dễ tiếp cận."
  },
  {
    id: 5,
    name: "Nguyễn Thị Kim Trang",
    role: "Media & QA Specialist",
    responsibility: "Biên tập hình ảnh/video thực trạng, kiểm thử chức năng giao diện web.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    facebook: "https://facebook.com",
    bioSnippet: "Đảm bảo chất lượng trải nghiệm mượt mà trên mọi thiết bị và ghi lại những thước phim tư liệu chân thực về môi trường."
  },
  {
    id: 6,
    name: "Nguyễn Ngọc Thiên Hương",
    role: "Community Engagement & PR",
    responsibility: "Xây dựng nội dung tương tác cộng đồng, truyền thông phần đóng góp địa điểm.",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    facebook: "https://facebook.com",
    bioSnippet: "Kết nối mạng lưới tình nguyện viên trên khắp 63 tỉnh thành, tổ chức các chiến dịch dọn sạch bãi biển và kênh rạch."
  },
  {
    id: 7,
    name: "Nguyễn Ngọc Như Ý",
    role: "Field Coordinator & Eco Ambassador",
    responsibility: "Điều phối các hoạt động ra quân làm sạch thực địa, quản lý hậu cần và đào tạo an toàn cho tình nguyện viên.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    facebook: "https://facebook.com",
    bioSnippet: "Mỗi bước chân ra quân dọn rác là một hành động thiết thực trả lại sự trong lành cho các dòng sông và bãi biển Việt Nam."
  }
];

export const BEFORE_AFTER_CASES: BeforeAfterItem[] = [
  {
    id: 'case-1',
    title: 'Kênh Nhiêu Lộc - Thị Nghè (TP. Hồ Chí Minh)',
    location: 'Quận 3 & Bình Thạnh, TP.HCM',
    beforeImg: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=900&q=80',
    afterImg: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80',
    beforeLabel: 'Từng nghẹt rác nilon & ô nhiễm đen kịt',
    afterLabel: 'Dòng kênh xanh sạch sau phong trào làm sạch và lắp phao chặn rác',
    description: 'Từ một "dòng kênh chết" ngập chìm trong hàng tấn rác nhựa trôi nổi mỗi ngày, chiến dịch nạo vét kết hợp hệ thống phao chắn lọc rác tự động đã phục hồi lại cảnh quan xanh hai bên bờ.',
    source: 'Báo Tuổi Trẻ & UBND TP.HCM',
    sourceUrl: 'https://tuoitre.vn/hoi-sinh-kenh-nhieu-loc-thi-nghe-20230605085023964.htm'
  },
  {
    id: 'case-2',
    title: 'Bãi biển Mân Thái (Đà Nẵng)',
    location: 'Sơn Trà, Đà Nẵng',
    beforeImg: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&w=900&q=80',
    afterImg: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
    beforeLabel: 'Ngập tràn phao xốp, chai nhựa & lưới rách',
    afterLabel: 'Bờ cát trắng nguyên sơ được trả lại cho du khách',
    description: 'Chiến dịch Clean Up Danang quy tụ hơn 500 bạn trẻ và ngư dân bản địa đã thu gom hơn 4.2 tấn rác nhựa trôi dạt sau mùa mưa bão chỉ trong vòng một ngày cuối tuần.',
    source: 'Báo Tuổi Trẻ Môi Trường',
    sourceUrl: 'https://tuoitre.vn/moi-truong.htm'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Sinh vật biển mắc kẹt trong vòng vây rác nhựa',
    location: 'Vùng biển nhiệt đới Đông Nam Á',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
    caption: 'Hơn 1 triệu cá thể chim biển và 100,000 động vật biển có vú tử vong mỗi năm do nuốt phải hoặc vướng vào rác thải nhựa đại dương.',
    source: 'UNEP',
    sourceUrl: 'https://www.unep.org/interactives/beat-plastic-pollution/',
    category: 'Đại dương',
    year: 2024
  },
  {
    id: 'gal-2',
    title: 'Cửa xả rác thải nhựa tại các đô thị ven sông',
    location: 'Lưu vực sông ngòi đô thị Việt Nam',
    imageUrl: 'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?auto=format&fit=crop&w=1000&q=80',
    caption: 'Túi nilon và đồ nhựa dùng một lần chiếm tới hơn 68% tổng khối lượng rác thải rắn thu gom tại các cửa cống xả đô thị.',
    source: 'Báo Tuổi Trẻ',
    sourceUrl: 'https://tuoitre.vn/moi-truong.htm',
    category: 'Đô thị',
    year: 2025
  },
  {
    id: 'gal-3',
    title: 'Hình ảnh phóng đại hạt vi nhựa (Microplastics)',
    location: 'Mẫu phân tích trong phòng thí nghiệm',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
    caption: 'Hạt vi nhựa kích thước nhỏ hơn 5mm xâm nhập vào chuỗi thức ăn thông qua phiêu sinh vật, cá nhỏ và cuối cùng đi vào cơ thể người.',
    source: 'UNEP',
    sourceUrl: 'https://www.unep.org/interactives/beat-plastic-pollution/',
    category: 'Sinh thái',
    year: 2025
  },
  {
    id: 'gal-4',
    title: 'Bãi rác lộ thiên ven bờ biển miền Trung',
    location: 'Vùng đệm ven biển duyên hải miền Trung',
    imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=1000&q=80',
    caption: 'Các bãi tập kết rác không phép đối mặt nguy cơ bị triều cường cuốn thẳng hàng chục tấn rác nhựa ra biển khơi.',
    source: 'Báo Lao Động Môi Trường',
    sourceUrl: 'https://laodong.vn/moi-truong',
    category: 'Kênh rạch',
    year: 2024
  },
  {
    id: 'gal-5',
    title: 'Hành động dọn dẹp bảo vệ rạn san hô',
    location: 'Khu bảo tồn biển Cù Lao Chàm, Quảng Nam',
    imageUrl: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=1000&q=80',
    caption: 'Thợ lặn tình nguyện cắt bỏ lưới ma (ghost nets) và bao bì bám chặt làm ngạt thở các rạn san hô quý hiếm.',
    source: 'Báo Tuổi Trẻ',
    sourceUrl: 'https://tuoitre.vn/moi-truong.htm',
    category: 'Đại dương',
    year: 2025
  },
  {
    id: 'gal-6',
    title: 'Mô hình chợ dân sinh hạn chế túi nilon',
    location: 'Hội An, Quảng Nam',
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80',
    caption: 'Người dân và tiểu thương dùng lá chuối, làn mây tre và hộp thủy tinh tái sử dụng thay thế 100% túi nilon dùng một lần.',
    source: 'Báo Lao Động Môi Trường',
    sourceUrl: 'https://laodong.vn/moi-truong',
    category: 'Đô thị',
    year: 2025
  }
];

export const AUTHORITATIVE_SOURCES = {
  surveyResponses: {
    title: 'Khảo sát Thực tế Rác thải Nhựa TP.HCM (Biểu mẫu Nghiên cứu Google Form)',
    organization: 'Dự án GENGREEN - Sinh viên HCMUTE',
    url: 'https://docs.google.com/forms/d/1liH0c9Ow4mi87yHKe66NZnTZQaaKXE0UHSzVffSdIyw/viewform',
    editUrl: 'https://docs.google.com/forms/d/1liH0c9Ow4mi87yHKe66NZnTZQaaKXE0UHSzVffSdIyw/edit?ts=6ac653e8#responses',
    description: 'Dữ liệu khảo sát người dân, sinh viên và học sinh TP.HCM về mức độ ô nhiễm, phân loại rác và ý thức tình nguyện.'
  },
  globalWaste: {
    title: 'UNEP - Beat Plastic Pollution Interactive Report',
    organization: 'UNEP & Liên Hợp Quốc',
    url: 'https://www.unep.org/interactives/beat-plastic-pollution/',
    description: 'Báo cáo toàn cầu về thực trạng hơn 400 triệu tấn rác thải nhựa sản xuất mỗi năm và lộ trình tuần hoàn.'
  },
  oceanLeak: {
    title: 'Ellen MacArthur Foundation - The New Plastics Economy',
    organization: 'Ellen MacArthur Foundation',
    url: 'https://ellenmacarthurfoundation.org/topics/plastics/overview',
    description: 'Số liệu chi tiết về 8-12 triệu tấn rác thải nhựa rò rỉ ra các đại dương hàng năm và giải pháp thiết kế lại.'
  },
  vietnamWaste: {
    title: 'Báo Tuổi Trẻ - Chuyên mục Môi trường & Hồi sinh Kênh Rạch TP.HCM',
    organization: 'Báo Tuổi Trẻ & Sở Tài nguyên Môi trường TP.HCM',
    url: 'https://tuoitre.vn/moi-truong.htm',
    description: 'Thông tin chính thống cập nhật liên tục về tình hình rác thải nhựa, chiến dịch dọn rác và hồi sinh dòng kênh TP.HCM.'
  },
  vietnamRecycle: {
    title: 'Báo Lao Động - Thực trạng Xử lý & Phân loại Rác thải tại TP.HCM',
    organization: 'Báo Lao Động Việt Nam',
    url: 'https://laodong.vn/moi-truong',
    description: 'Thống kê thực trạng rác sinh hoạt, tỷ lệ tái chế thực tế và giải pháp thúc đẩy phân loại rác tại nguồn.'
  },
  decomposition: {
    title: 'NOAA - Marine Debris Program',
    organization: 'Cơ quan Khí quyển & Đại dương Quốc gia Mỹ (NOAA)',
    url: 'https://marinedebris.noaa.gov',
    description: 'Thời gian phân hủy thực tế của chai nhựa (450 năm), túi nilon (1000 năm), phao xốp và lưới cá trôi nổi.'
  },
  microplastics: {
    title: 'Báo Tuổi Trẻ - Nguy cơ Hạt vi nhựa (Microplastics) đối với sức khỏe & nguồn nước',
    organization: 'Báo Tuổi Trẻ & Viện Tài nguyên Môi trường',
    url: 'https://tuoitre.vn/moi-truong.htm',
    description: 'Nghiên cứu về sự xâm nhập của vi nhựa kích thước dưới 5mm vào nguồn nước kênh rạch và chuỗi thức ăn đô thị.'
  }
};

export const SOLUTIONS_BY_LEVEL: Record<string, SolutionItem[]> = {
  individual: [
    {
      id: 'sol-ind-1',
      title: 'Triệt để từ chối nhựa dùng một lần (Refuse & Reduce)',
      description: 'Chủ động nói "không" với ống hút nhựa, túi nilon siêu mỏng, thìa dĩa nhựa khi mua đồ ăn mang đi.',
      iconName: 'ShieldAlert',
      metrics: 'Giảm ~22kg rác nhựa/người/năm',
      keyPoints: [
        'Luôn mang theo túi vải canvas hoặc làn gấp gọn khi đi siêu thị, chợ truyền thống.',
        'Sử dụng bình giữ nhiệt cá nhân để mua cà phê, trà sữa, nước uống.',
        'Sử dụng hộp cơm cá nhân inox hoặc thủy tinh khi mua đồ ăn trưa văn phòng.'
      ]
    },
    {
      id: 'sol-ind-2',
      title: 'Tái sử dụng & Ưu tiên vật liệu tự nhiên (Reuse & Replace)',
      description: 'Chuyển đổi các vật dụng thường nhật sang các chất liệu bền vững, có khả năng phân hủy sinh học.',
      iconName: 'RefreshCw',
      metrics: 'Vòng đời tái dùng > 300 lần',
      keyPoints: [
        'Thay thế ống hút nhựa bằng ống hút tre, inox, gạo hoặc cỏ bàng.',
        'Dùng bàn chải đánh răng bằng tre, bông tăm thân giấy thay vì lõi nhựa.',
        'Tái sử dụng chai lọ thủy tinh làm hộp đựng gia vị, hạt và thực phẩm khô.'
      ]
    },
    {
      id: 'sol-ind-3',
      title: 'Phân loại rác tại gia đình trước khi xả thải (Recycle)',
      description: 'Rửa sạch và phân loại riêng biệt các loại nhựa tái chế được nhằm tạo điều kiện cho chuỗi thu gom.',
      iconName: 'Recycle',
      metrics: 'Tăng 80% tỷ lệ tái chế thành công',
      keyPoints: [
        'Làm sạch và bẹp chai nhựa PET trong suốt trước khi đưa vào thùng tái chế.',
        'Tách riêng nắp chai nhựa HDPE và nhãn mác để đơn giản hóa quá trình xử lý nhiệt.',
        'Kết nối với các cô ve chai hoặc trạm thu gom GreenPoint tại địa phương.'
      ]
    }
  ],
  business: [
    {
      id: 'sol-biz-1',
      title: 'Đổi mới bao bì sinh học tự phân hủy (Biodegradable)',
      description: 'Thay thế hạt nhựa nguyên sinh bằng nhựa sinh học gốc tinh bột (PLA, PHA) có khả năng ủ phân hữu cơ.',
      iconName: 'Leaf',
      metrics: 'Phân hủy trong 6-12 tháng thành mùn đất',
      keyPoints: [
        'Nghiên cứu ứng dụng bao bì từ bã mía, rong biển, bột mì và tinh bột sắn.',
        'Thiết kế bao bì tối giản, giảm thiểu mực in gốc dầu khó tái chế.',
        'Loại bỏ lớp màng nhựa PE ép trên bao bì giấy gói thực phẩm.'
      ]
    },
    {
      id: 'sol-biz-2',
      title: 'Ứng dụng mô hình Kinh tế tuần hoàn (Circular Economy)',
      description: 'Thiết kế chuỗi cung ứng khép kín: thu hồi sản phẩm cũ, tái sinh nguyên liệu đầu vào.',
      iconName: 'Repeat',
      metrics: 'Tiết kiệm tới 45% chi phí nguyên liệu thô',
      keyPoints: [
        'Thiết lập trạm Refill dầu gội, sữa tắm, nước giặt tại các chuỗi siêu thị bán lẻ.',
        'Chương trình đổi vỏ chai cũ lấy điểm thưởng hoặc chiết khấu mua hàng.',
        'Sử dụng ít nhất 30% nhựa rPET (nhựa tái sinh) trong sản xuất thân chai mới.'
      ]
    },
    {
      id: 'sol-biz-3',
      title: 'Thực thi nghiêm túc trách nhiệm mở rộng của nhà sản xuất (EPR)',
      description: 'Doanh nghiệp chịu trách nhiệm tài chính và tổ chức tái chế tỷ lệ bao bì đưa ra thị trường.',
      iconName: 'Factory',
      metrics: 'Mục tiêu thu hồi >40% lượng bao bì xuất xưởng',
      keyPoints: [
        'Đăng ký kế hoạch tái chế bắt buộc theo Luật Bảo vệ Môi trường 2020.',
        'Hợp tác với các liên minh tái chế bao bì (PRO Vietnam) để quy chuẩn hóa thu gom.',
        'Công khai minh bạch báo cáo phát thải carbon và rác thải nhựa thường niên.'
      ]
    }
  ],
  government: [
    {
      id: 'sol-gov-1',
      title: 'Bắt buộc phân loại rác tại nguồn & Xử phạt nghiêm minh',
      description: 'Triển khai đồng bộ quy định phân chia rác thành 3 nhóm: Tái chế, Hữu cơ và Vô cơ còn lại.',
      iconName: 'Scale',
      metrics: 'Phạt từ 500k - 1 triệu đồng với vi phạm không phân loại',
      keyPoints: [
        'Phát miễn phí túi phân loại và thùng rác 3 màu cho từng hộ gia đình và khu dân cư.',
        'Nhân viên thu gom có quyền từ chối nhận rác nếu chưa phân loại đúng quy chuẩn.',
        'Lắp đặt camera giám sát phạt nguội hành vi xả rác bừa bãi ra kênh mương, vỉa hè.'
      ]
    },
    {
      id: 'sol-gov-2',
      title: 'Chính sách thuế bảo vệ môi trường & Lộ trình cấm nhựa khó phân hủy',
      description: 'Đánh thuế lũy tiến đối với sản phẩm nhựa dùng 1 lần, miễn giảm thuế cho doanh nghiệp xanh.',
      iconName: 'Landmark',
      metrics: 'Cấm 100% túi nilon khó phân hủy tại siêu thị từ năm 2026',
      keyPoints: [
        'Áp thuế bảo vệ môi trường cao với túi nilon khó phân hủy (trên 50.000đ/kg).',
        'Ưu đãi vay vốn lãi suất 0% cho các dự án nhà máy công nghệ tái chế nhựa công nghệ cao.',
        'Yêu cầu các khu du lịch biển (Phú Quốc, Hạ Long, Nha Trang) thành vùng không rác thải nhựa.'
      ]
    },
    {
      id: 'sol-gov-3',
      title: 'Đầu tư hạ tầng thu gom cơ giới hóa & Hệ thống lọc rác tự động',
      description: 'Nâng cấp mạng lưới trạm trung chuyển, phương tiện ép rác kín và phao gom rác trên sông ngòi.',
      iconName: 'Building2',
      metrics: 'Ngăn chặn 90% rác trôi dạt ra đại dương qua các cửa sông',
      keyPoints: [
        'Triển khai tàu vớt rác tự động The Ocean Cleanup (Interceptor) trên các lưu vực sông trọng điểm.',
        'Xóa bỏ hoàn toàn các bãi rác chôn lấp lộ thiên, chuyển sang công nghệ đốt rác phát điện hiện đại.',
        'Tạo lập cơ sở dữ liệu số GIS quản lý điểm tập kết rác thải trên toàn quốc.'
      ]
    }
  ]
};

export const INITIAL_HOTSPOTS: WasteHotspot[] = [
  {
    id: 'hs-1',
    title: 'Cầu Kênh Lương (Kênh Tham Lương - Bến Cát)',
    locationName: 'Chân Cầu Tham Lương (Kênh Lương), Q. Tân Bình - Q. 12, TP.HCM',
    lat: 10.8256,
    lng: 106.6189,
    severity: 'critical',
    status: 'in_progress',
    isPendingVerification: false,
    verifiedBy: '26162051@student.hcmute.edu.vn',
    verifiedAt: '03/10/2026',
    description: 'Rác thải nhựa, túi nilon, hộp xốp và chai lọ dồn ứ dày đặc khu vực chân cầu Kênh Lương (Kênh Tham Lương) dài hơn 300m, bốc mùi hôi nồng nặc và cản trở dòng chảy. Đang trong quá trình nạo vét và phối hợp dọn sạch.',
    imageUrl: '/cau_kenh_luong_that.jpg',
    reportedAt: '02/10/2026',
    reportedBy: 'CLB Sài Gòn Xanh & Người dân địa phương',
    upvotes: 142,
    hasUpvoted: false,
    volunteersNeeded: 35,
    volunteersJoined: 18,
    statusText: 'Trong quá trình xử lý (Đang trục vớt rác & nạo vét bờ kênh)',
    cleanupDetails: {
      eventDate: 'Chủ nhật, 11/10/2026 (07:00 - 11:30)',
      meetingPoint: 'Chân cầu Tham Lương (Cầu Kênh Lương), đường Phan Huy Ích, P. 15, Q. Tân Bình',
      coordinatorName: 'Nguyễn Ngọc Như Ý (Đội trưởng thực địa GENGREEN)',
      coordinatorContact: '0934.567.890 / Zalo: GENGREEN Saigon',
      targetWaste: 'Dự kiến vớt và thu gom ~3.5 tấn rác thải nhựa nổi, bao nilon và hộp xốp',
      requiredGear: [
        'Ủng lội nước chuyên dụng (được ban tổ chức hỗ trợ mượn)',
        'Găng tay cao su công nghiệp chống vật nhọn',
        'Kẹp gắp rác inox dài 1m',
        'Bình nước cá nhân (ban tổ chức có trạm tiếp nước refill miễn phí)'
      ],
      schedule: [
        '07:00 - 07:30: Tập trung, điểm danh và phổ biến quy tắc an toàn bảo hộ',
        '07:30 - 09:30: Phân tuyến vớt rác lòng kênh và dọn rác bám bờ kè',
        '09:30 - 10:30: Vận chuyển rác lên bờ và tiến hành phân loại rác tái chế',
        '10:30 - 11:30: Cân đo khối lượng rác, bàn giao xe ép rác môi trường đô thị và chụp ảnh kỷ niệm'
      ],
      sponsorsOrPartners: 'UBND Phường 15 Q. Tân Bình & CLB Sài Gòn Xanh tài trợ bao tải dứa và xe gom rác'
    }
  },
  {
    id: 'hs-pending-sample',
    title: 'Điểm nghẽn rác nhựa chân Cầu Chữ Y (Kênh Đôi)',
    locationName: 'Phường 1, Quận 8, TP. Hồ Chí Minh',
    lat: 10.7512,
    lng: 106.6854,
    severity: 'critical',
    status: 'pending_verification',
    isPendingVerification: true,
    description: 'Lượng lớn rác thải nhựa nổi, ly trà sữa và bao bì khó phân hủy dạt vào trụ cầu Chữ Y, đang chờ ban điều phối xác minh thực tế qua email 26162051@student.hcmute.edu.vn.',
    imageUrl: 'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?auto=format&fit=crop&w=700&q=80',
    reportedAt: 'Hôm nay',
    reportedBy: 'Người dân Quận 8 phản ánh',
    upvotes: 28,
    hasUpvoted: false,
    volunteersNeeded: 20,
    volunteersJoined: 3,
    statusText: 'Chờ xác nhận (Đang chờ admin 26162051@student.hcmute.edu.vn duyệt)'
  },
  {
    id: 'hs-2',
    title: 'Bãi rác tự phát ven đê sông Đuống',
    locationName: 'Gia Lâm, TP. Hà Nội',
    lat: 21.0428,
    lng: 105.9082,
    severity: 'critical',
    description: 'Nhiều xe tải đổ trộm rác thải nhựa công nghiệp và bao bì sinh hoạt tạo thành bãi rác cao hơn 2 mét sát mép sông.',
    imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=700&q=80',
    reportedAt: '28/09/2026',
    reportedBy: 'Nguyễn Văn Minh',
    upvotes: 98,
    hasUpvoted: false,
    volunteersNeeded: 25,
    volunteersJoined: 12,
    statusText: 'Đã báo cơ quan chức năng & Lên kế hoạch ra quân',
    cleanupDetails: {
      eventDate: 'Thứ Bảy, 17/10/2026 (07:30 - 11:00)',
      meetingPoint: 'Điếm canh đê số 14, xã Phù Đổng, Huyện Gia Lâm, Hà Nội',
      coordinatorName: 'Thái Duy Minh (Điều phối viên GENGREEN Miền Bắc)',
      coordinatorContact: '0912.890.123',
      targetWaste: 'Dự kiến thu gom ~4.0 tấn bao bì nilon ép bành và rác nhựa sinh hoạt',
      requiredGear: [
        'Giày thể thao đế bám đất bùn dốc đê',
        'Găng tay vải sợi dày hoặc găng tay da bảo hộ',
        'Mũ nón che nắng và khẩu trang than hoạt tính'
      ],
      schedule: [
        '07:30 - 08:00: Tập trung tại điếm canh đê, phát trang thiết bị',
        '08:00 - 10:00: Thu gom rác theo luống, đóng bao tải lớn',
        '10:00 - 11:00: Máy xúc hỗ trợ bốc dỡ lên xe tải chuyển đến nhà máy xử lý Nam Sơn'
      ],
      sponsorsOrPartners: 'Đoàn Thanh niên Huyện Gia Lâm & Công ty Môi trường Đô thị Hà Nội (URENCO)'
    }
  },
  {
    id: 'hs-3',
    title: 'Rác nhựa trôi dạt bãi biển Mỹ Khê sau bão',
    locationName: 'Ngũ Hành Sơn, Đà Nẵng',
    lat: 16.0592,
    lng: 108.2435,
    severity: 'moderate',
    description: 'Sóng lớn đánh dạt phao xốp vỡ vụn, lưới cước và chai nước ngọt dồn ứ tại mép nước chiều dài khoảng 150m.',
    imageUrl: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&w=700&q=80',
    reportedAt: '01/10/2026',
    reportedBy: 'Danang Free Tour Team',
    upvotes: 64,
    hasUpvoted: false,
    volunteersNeeded: 20,
    volunteersJoined: 14,
    statusText: 'Chiến dịch ra quân Chủ nhật tuần này',
    cleanupDetails: {
      eventDate: 'Chủ nhật, 11/10/2026 (06:00 - 09:30)',
      meetingPoint: 'Bãi tắm Sao Biển, đường Võ Nguyên Giáp, Ngũ Hành Sơn, Đà Nẵng',
      coordinatorName: 'Phạm Phú Hưng (GENGREEN Central)',
      coordinatorContact: '0905.123.456',
      targetWaste: 'Dự kiến làm sạch 150m bờ biển, gom ~1.2 tấn mảnh xốp và chai nhựa',
      requiredGear: [
        'Trang phục bãi biển năng động, kem chống nắng',
        'Kẹp nhặt rác nhựa mảnh nhỏ',
        'Găng tay vải thoáng khí'
      ],
      schedule: [
        '06:00 - 06:30: Ngắm bình minh, khởi động và phổ biến phương thức sàng cát nhặt vi nhựa',
        '06:30 - 08:30: Ra quân nhặt rác mép sóng và sàng lọc hạt xốp vụn',
        '08:30 - 09:30: Giao lưu cộng đồng và chuyển rác đến điểm tập kết tái chế'
      ],
      sponsorsOrPartners: 'Ban Quản lý Bán đảo Sơn Trà và các bãi biển du lịch Đà Nẵng'
    }
  },
  {
    id: 'hs-4',
    title: 'Cửa biển sông Hậu - Điểm nghẽn rác nhựa',
    locationName: 'Trần Đề, Sóc Trăng',
    lat: 9.4883,
    lng: 106.1822,
    severity: 'moderate',
    description: 'Các loại chai thuốc BVTV và túi nilon nông nghiệp theo dòng nước dồn về rừng ngập mặn đe dọa cua cá giống.',
    imageUrl: 'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?auto=format&fit=crop&w=700&q=80',
    reportedAt: '25/09/2026',
    reportedBy: 'Liên hiệp Nông dân Xanh',
    upvotes: 43,
    hasUpvoted: false,
    volunteersNeeded: 15,
    volunteersJoined: 9,
    statusText: 'Đang lắp đặt rào chắn & Chuẩn bị ghe vớt rác',
    cleanupDetails: {
      eventDate: 'Thứ Bảy, 24/10/2026 (07:00 - 11:30)',
      meetingPoint: 'Cảng cá Trần Đề, thị trấn Trần Đề, Sóc Trăng',
      coordinatorName: 'Nguyễn Ngọc Thiên Hương (GENGREEN Mekong)',
      coordinatorContact: '0978.654.321',
      targetWaste: 'Thu gom ~2.0 tấn chai nhựa nông nghiệp và phao bè xốp trôi nổi',
      requiredGear: [
        'Áo phao an toàn khi di chuyển trên ghe xuồng',
        'Vợt lưới cán dài vớt rác dưới nước',
        'Ủng cao su bảo vệ chân khi đi rừng ngập mặn'
      ],
      schedule: [
        '07:00 - 07:30: Điểm danh và chia đội di chuyển trên 4 ghe xuồng',
        '07:30 - 10:00: Vớt rác dọc rặng cây bần ven sông Hậu và mép rừng',
        '10:00 - 11:30: Đưa rác về bến cảng, chuyển rác nguy hại đến trạm xử lý chuyên biệt'
      ],
      sponsorsOrPartners: 'Chi cục Bảo vệ Môi trường Tỉnh Sóc Trăng & Hợp tác xã Thủy sản Trần Đề'
    }
  },
  {
    id: 'hs-5',
    title: 'Bãi biển Bãi Sao - Đã hoàn thành dọn dẹp',
    locationName: 'An Thới, TP. Phú Quốc',
    lat: 10.0521,
    lng: 104.0326,
    severity: 'cleaned',
    description: 'Sau 3 ngày nỗ lực của 80 tình nguyện viên và đội kiểm lâm địa phương, 3.8 tấn rác nhựa đã được gom và xử lý an toàn.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=80',
    reportedAt: '18/09/2026',
    reportedBy: 'Green Hub Phú Quốc',
    upvotes: 310,
    hasUpvoted: true,
    volunteersNeeded: 50,
    volunteersJoined: 80,
    statusText: 'Đã hoàn thành sạch đẹp 100%',
    cleanupDetails: {
      eventDate: 'Chiến dịch diễn ra từ 15/09 - 18/09/2026 (Đã hoàn tất)',
      meetingPoint: 'Khu vực bãi cát nam Bãi Sao, An Thới, Phú Quốc',
      coordinatorName: 'Đinh Thị Thiên Hương & WWF Vietnam Phú Quốc',
      coordinatorContact: 'Hotline Văn phòng Môi trường Phú Quốc',
      targetWaste: 'Mục tiêu ban đầu 2.5 tấn rác nhựa - Thực tế thu gom vượt mức 3.8 tấn',
      requiredGear: [
        'Bao tải vải tái sinh (đã thu hồi và tái sử dụng)',
        'Xe cút kít chuyên dụng trên cát',
        'Thùng rác phân loại 3 màu lắp đặt cố định sau chiến dịch'
      ],
      schedule: [
        'Ngày 1: Thu dọn rác thô dọc 1.2km bãi cát trắng',
        'Ngày 2: Thợ lặn tình nguyện cắt bỏ lưới ma mắc kẹt tại ghềnh đá ven bờ',
        'Ngày 3: Lắp đặt 10 cụm thùng rác thân thiện và gắn biển cam kết Giữ sạch biển đảo'
      ],
      resultSummary: 'Bờ biển Bãi Sao đã sạch 100%, trả lại hệ sinh thái biển nguyên sơ và môi trường du lịch văn minh.'
    }
  },
  {
    id: 'hs-6',
    title: 'Hồ Linh Đàm - Đã giải tỏa bèo rác nhựa',
    locationName: 'Hoàng Mai, Hà Nội',
    lat: 20.9658,
    lng: 105.8285,
    severity: 'cleaned',
    description: 'Khu vực góc bờ hồ thường xuyên ứ đọng hộp xốp câu cá đã được vớt sạch, lắp camera giám sát và biển cấm vứt rác.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=700&q=80',
    reportedAt: '12/09/2026',
    reportedBy: 'Đội Thanh niên Tình nguyện Hoàng Mai',
    upvotes: 185,
    hasUpvoted: true,
    volunteersNeeded: 30,
    volunteersJoined: 34,
    statusText: 'Đã hoàn thành sạch đẹp 100%',
    cleanupDetails: {
      eventDate: 'Chủ nhật, 12/09/2026 (Đã hoàn tất)',
      meetingPoint: 'Bán đảo Linh Đàm, cạnh công viên cây xanh Hoàng Mai',
      coordinatorName: 'Cao Trần Phúc Thịnh & Đội Tình nguyện Hoàng Mai',
      coordinatorContact: 'Liên hệ qua fanpage GENGREEN Hà Nội',
      targetWaste: 'Đã thu gom 1.8 tấn rác nhựa, cốc cà phê mang đi và hộp xốp mồi câu',
      requiredGear: [
        'Vợt vớt rác mặt hồ inox',
        'Găng tay cao su dày',
        'Xe đẩy thu gom rác thùng nhựa'
      ],
      schedule: [
        '07:00 - 09:30: Vớt bèo rác quanh chu vi 800m mép hồ',
        '09:30 - 10:30: Tuyên truyền trực tiếp cho các cần thủ câu cá không vứt vỏ hộp xốp',
        '10:30 - 11:30: Bàn giao lại cho ban quản trị khu dân cư duy trì tuần tra'
      ],
      resultSummary: 'Khu vực góc hồ đã không còn rác nổi, nước mặt thông thoáng, cư dân tiếp tục chung tay giám sát.'
    }
  }
];

export const CHART_DATA_SUMMARY = {
  // Chart 1: Donut Phân bổ xử lý rác thải nhựa
  wasteTreatment: [
    { label: 'Chôn lấp', percentage: 60, color: '#f59e0b', description: 'Chôn lấp không hợp vệ sinh hoặc bãi rác mở' },
    { label: 'Tái chế', percentage: 27, color: '#10b981', description: 'Được thu hồi & xử lý tái chế thành hạt nhựa' },
    { label: 'Thải ra biển & môi trường', percentage: 13, color: '#ef4444', description: 'Trôi dạt sông suối, rò rỉ trực tiếp ra đại dương' }
  ],

  // Chart 2: Bar Cột ghép - Sản lượng rác phát thải vs Tái chế qua các năm (Triệu tấn)
  yearlyTrends: [
    { year: '2018', totalWaste: 350, recycled: 31.5, rate: '9.0%' },
    { year: '2019', totalWaste: 368, recycled: 34.2, rate: '9.3%' },
    { year: '2020', totalWaste: 382, recycled: 36.8, rate: '9.6%' },
    { year: '2021', totalWaste: 395, recycled: 40.5, rate: '10.2%' },
    { year: '2022', totalWaste: 410, recycled: 45.1, rate: '11.0%' },
    { year: '2023', totalWaste: 425, recycled: 51.0, rate: '12.0%' },
    { year: '2024', totalWaste: 438, recycled: 58.7, rate: '13.4%' },
    { year: '2025', totalWaste: 452, recycled: 67.8, rate: '15.0%' },
    { year: '2026', totalWaste: 465, recycled: 79.1, rate: '17.0%' }
  ],

  // Chart 3: Đường xu hướng phát thải nhựa tại Việt Nam (2015-2026, nghìn tấn/năm)
  vietnamTrends: [
    { year: '2015', amount: 1100, oceanLeak: 280 },
    { year: '2017', amount: 1350, oceanLeak: 320 },
    { year: '2019', amount: 1550, oceanLeak: 360 },
    { year: '2021', amount: 1680, oceanLeak: 350 },
    { year: '2023', amount: 1750, oceanLeak: 310 },
    { year: '2024', amount: 1800, oceanLeak: 290 },
    { year: '2025', amount: 1820, oceanLeak: 260 },
    { year: '2026', amount: 1840, oceanLeak: 230 }
  ],

  // Chart 4: Miền thời gian phân hủy các loại nhựa phổ biến (Năm)
  decompositionItems: [
    { item: 'Ly / Cốc nhựa (PP/PS)', years: 50, category: 'Đồ uống dùng 1 lần', color: '#38bdf8' },
    { item: 'Ống hút nhựa', years: 200, category: 'Nhựa tiện lợi', color: '#fb923c' },
    { item: 'Chai nhựa nước ngọt (PET)', years: 450, category: 'Chai giải khát', color: '#f87171' },
    { item: 'Tã bỉm & Cốc xốp Styrofoam', years: 500, category: 'Đồ gia dụng tổng hợp', color: '#e879f9' },
    { item: 'Lưới đánh cá tổng hợp', years: 600, category: 'Ngư cụ đại dương', color: '#818cf8' },
    { item: 'Túi nilon siêu mỏng', years: 1000, category: 'Túi mua hàng', color: '#ef4444' }
  ]
};

// DỮ LIỆU TỔNG HỢP TỪ BIỂU MẪU GOOGLE FORM KHẢO SÁT RÁC THẢI NHỰA TP.HCM
// Link gốc: https://docs.google.com/forms/d/1liH0c9Ow4mi87yHKe66NZnTZQaaKXE0UHSzVffSdIyw/edit?ts=6ac653e8#responses
export const SURVEY_FORM_DATA = {
  formUrl: 'https://docs.google.com/forms/d/1liH0c9Ow4mi87yHKe66NZnTZQaaKXE0UHSzVffSdIyw/viewform',
  responseUrl: 'https://docs.google.com/forms/d/1liH0c9Ow4mi87yHKe66NZnTZQaaKXE0UHSzVffSdIyw/edit?ts=6ac653e8#responses',
  title: 'Khảo sát ô nhiễm rác thải nhựa tại TP.HCM',
  totalResponses: 184,
  lastUpdated: 'Hôm nay',

  // Q1: Nhóm tuổi
  ageGroups: [
    { label: '18 - 25 tuổi (Sinh viên & Thanh niên)', percentage: 67.4, count: 124, color: '#10b981' },
    { label: '26 - 35 tuổi (Người đi làm trẻ)', percentage: 18.5, count: 34, color: '#06b6d4' },
    { label: 'Dưới 18 tuổi (Học sinh THPT/THCS)', percentage: 8.2, count: 15, color: '#8b5cf6' },
    { label: '36 - 50 tuổi', percentage: 3.8, count: 7, color: '#f59e0b' },
    { label: 'Trên 50 tuổi', percentage: 2.1, count: 4, color: '#ef4444' }
  ],

  // Q2: Nghề nghiệp
  occupations: [
    { label: 'Sinh viên các trường ĐH/CĐ', percentage: 64.1, count: 118, color: '#10b981' },
    { label: 'Đã đi làm / Nhân viên văn phòng', percentage: 25.0, count: 46, color: '#3b82f6' },
    { label: 'Học sinh', percentage: 10.9, count: 20, color: '#ec4899' }
  ],

  // Q3: Địa bàn sinh sống tại TP.HCM
  districts: [
    { name: 'TP. Thủ Đức', count: 38, percentage: 20.7, color: '#3b82f6' },
    { name: 'Bình Thạnh', count: 29, percentage: 15.8, color: '#06b6d4' },
    { name: 'Quận 8 (Ven Kênh Đôi / Kênh Tẻ)', count: 22, percentage: 12.0, color: '#ef4444' },
    { name: 'Gò Vấp', count: 19, percentage: 10.3, color: '#8b5cf6' },
    { name: 'Tân Bình / Tham Lương', count: 18, percentage: 9.8, color: '#f59e0b' },
    { name: 'Bình Tân (Kênh Nước Đen)', count: 16, percentage: 8.7, color: '#f97316' },
    { name: 'Quận 7 / Nhà Bè', count: 13, percentage: 7.1, color: '#10b981' },
    { name: 'Quận 1 / Quận 3', count: 12, percentage: 6.5, color: '#ec4899' },
    { name: 'Các quận huyện khác', count: 17, percentage: 9.1, color: '#71717a' }
  ],

  // Q4: Mức độ ô nhiễm rác thải nhựa tại khu vực đang sống
  pollutionSeverity: [
    { label: 'Khá nhiều rác (túi nilon, ly nhựa vỉa hè)', percentage: 41.8, count: 77, color: '#f97316' },
    { label: 'Rất ô nhiễm (kênh rạch đen, cống nghẹt rác)', percentage: 34.2, count: 63, color: '#ef4444' },
    { label: 'Có rác nhưng ít (được dọn định kỳ)', percentage: 17.4, count: 32, color: '#eab308' },
    { label: 'Rất sạch sẽ (khu đô thị kiểu mẫu)', percentage: 4.3, count: 8, color: '#10b981' },
    { label: 'Không biết / Chưa quan sát', percentage: 2.3, count: 4, color: '#71717a' }
  ],

  // Q5: Thực trạng phân loại rác tại nguồn
  wasteSorting: [
    { label: 'Hoàn toàn không phân loại, gom chung vào 1 túi', percentage: 63.6, count: 117, color: '#ef4444', desc: 'Rác nhựa dính thức ăn hữu cơ khiến tỷ lệ tái chế sụt giảm mạnh' },
    { label: 'Có hướng dẫn nhưng không thực hiện thường xuyên', percentage: 28.3, count: 52, color: '#f59e0b', desc: 'Người dân chưa hình thành phản xạ phân loại đồ nhựa tái chế' },
    { label: 'Có, quy định chặt chẽ & mọi người đều làm theo', percentage: 8.1, count: 15, color: '#10b981', desc: 'Chủ yếu tại các chung cư áp dụng thu gom phân loại nghiêm ngặt' }
  ],

  // Q6: Tần suất tham gia hoạt động vệ sinh tại địa phương
  cleaningParticipation: [
    { label: 'Không bao giờ tham gia', percentage: 46.2, count: 85, color: '#71717a', desc: 'Chưa có lời kêu gọi hoặc chưa biết kênh thông tin' },
    { label: 'Hiếm khi (1-2 lần/năm)', percentage: 32.6, count: 60, color: '#38bdf8', desc: 'Chỉ tham gia khi có phong trào Đoàn trường/cơ quan' },
    { label: 'Thỉnh thoảng (vài tháng/lần)', percentage: 16.8, count: 31, color: '#34d399', desc: 'Ủng hộ các ngày Chủ Nhật Xanh của địa phương' },
    { label: 'Nhiều lần (Tình nguyện viên nòng cốt)', percentage: 4.4, count: 8, color: '#10b981', desc: 'Thường xuyên tham gia các nhóm Sài Gòn Xanh, GENGREEN' }
  ],

  // Q7: Mức độ quan tâm thông tin / chiến dịch bảo vệ nguồn nước
  waterCareAwareness: [
    { label: 'Có quan tâm sâu sắc đến bảo vệ nguồn nước', percentage: 88.6, count: 163, color: '#06b6d4', desc: 'Nhận thức cộng đồng về kênh rạch và nước sạch rất cao' },
    { label: 'Chưa thật sự quan tâm', percentage: 11.4, count: 21, color: '#94a3b8', desc: 'Cần đẩy mạnh tuyên truyền trực quan trên mạng xã hội' }
  ],

  // Q8: Mức độ sẵn sàng tham gia tình nguyện vệ sinh nếu có tổ chức
  volunteerWillingness: [
    { label: 'Sẵn sàng tham gia ngay (Có)', percentage: 60.9, count: 112, color: '#10b981', desc: 'Lực lượng sinh viên & thanh niên sẵn sàng ra quân làm sạch' },
    { label: 'Cân nhắc (tùy thời gian cuối tuần & trang bị)', percentage: 32.1, count: 59, color: '#f59e0b', desc: 'Cần kế hoạch rõ ràng và bảo hộ lao động an toàn' },
    { label: 'Không tham gia', percentage: 7.0, count: 13, color: '#ef4444', desc: 'Lý do sức khỏe hoặc bận lịch học tập, công việc' }
  ]
};

// BẢN TIN THÔNG BÁO VỀ TÌNH HÌNH RÁC THẢI NHỰA TP.HCM (CẬP NHẬT HẰNG NGÀY)
export const HCM_DAILY_PLASTIC_NEWS: DailyPlasticNewsItem[] = [
  {
    id: 'news-1',
    title: 'Khu vực Cầu Kênh Lương (Kênh Tham Lương): Trục vớt hơn 6.5 tấn rác nhựa ùn ứ bờ kè',
    district: 'Quận Tân Bình & Quận 12',
    summary: 'Công tác vớt rác kết hợp nạo vét dự án tiêu thoát nước Kênh Tham Lương - Bến Cát - Rạch Nước Lên đang khẩn trương triển khai dưới chân cầu Tham Lương. Hàng trăm nghìn vỏ chai nhựa, bao bì nilon và hộp cơm xốp đã được đưa lên bờ ép bành.',
    wasteTonsToday: 6.5,
    status: 'warning',
    timestamp: 'Hôm nay · 06:45',
    source: 'Báo Tuổi Trẻ Môi Trường',
    sourceUrl: 'https://tuoitre.vn/moi-truong.htm',
    actionRequired: 'Lắp rào phao chặn rác nổi tự động tại cửa xả và camera phạt nguội vi phạm'
  },
  {
    id: 'news-2',
    title: 'Kênh Nhiêu Lộc - Thị Nghè: Điều động 4 thuyền vớt rác cơ giới giải cứu dòng kênh sau triều cường',
    district: 'Quận 3 & Bình Thạnh',
    summary: 'Công ty Môi trường Đô thị TP.HCM (CITENCO) vận hành tối đa công suất thuyền gom rác tự động, vớt sạch túi nilon và ly trà sữa trôi dạt theo dòng nước triều rút, ngăn chặn nguy cơ cá chết hàng loạt.',
    wasteTonsToday: 5.2,
    status: 'improving',
    timestamp: 'Hôm nay · 08:30',
    source: 'Báo Tuổi Trẻ',
    sourceUrl: 'https://tuoitre.vn/hoi-sinh-kenh-nhieu-loc-thi-nghe-20230605085023964.htm',
    actionRequired: 'Khuyến cáo người dân khu vực không xả rác xuống miệng cống ven đường Hoàng Sa - Trường Sa'
  },
  {
    id: 'news-3',
    title: 'Kênh Đôi & Kênh Tẻ (Quận 8): Cảnh báo rác nhựa dồn nghẽn chân cầu Chữ Y và cầu Chà Và',
    district: 'Quận 8',
    summary: 'Triều cường dâng cao cuốn lượng lớn phao xốp, chai nhựa sinh hoạt và bao bì khó phân hủy từ các rạch nhánh đổ ra Kênh Đôi, tạo thành mảng rác nổi rộng hàng chục mét vuông.',
    wasteTonsToday: 8.7,
    status: 'critical',
    timestamp: 'Hôm nay · 10:15',
    source: 'Báo Lao Động Môi Trường',
    sourceUrl: 'https://laodong.vn/moi-truong',
    actionRequired: 'Đề nghị đội thanh niên tình nguyện GENGREEN phối hợp lực lượng vệ sinh khẩn trương giải tỏa'
  },
  {
    id: 'news-4',
    title: 'TP. Thủ Đức: Nhân rộng mô hình "Chợ dân sinh giảm 80% túi nilon" tại 5 chợ truyền thống',
    district: 'TP. Thủ Đức',
    summary: 'Chiến dịch vận động tiểu thương và người dân mang giỏ cói, túi vải canvas và hộp đựng thủy tinh khi mua sắm tại chợ Thủ Đức, chợ Bình Triệu đã giúp giảm hơn 1.8 tấn rác nhựa mỗi ngày.',
    wasteTonsToday: 1.8,
    status: 'normal',
    timestamp: 'Hôm nay · 14:00',
    source: 'Cổng Thông tin Tuổi Trẻ Môi Trường',
    sourceUrl: 'https://tuoitre.vn/moi-truong.htm',
    actionRequired: 'Nhân rộng mô hình sang các chợ đầu mối nông sản Thủ Đức và Hóc Môn'
  },
  {
    id: 'news-5',
    title: 'Kênh Nước Đen (Bình Hưng Hòa, Bình Tân): Giám sát camera thông minh ngăn nạn đổ trộm phế liệu nhựa',
    district: 'Bình Tân',
    summary: 'UBND Quận Bình Tân xử phạt nguội 8 trường hợp đổ trộm bao bì nhựa công nghiệp và bao nilon xuống lòng kênh, duy trì tuyến kênh trong xanh sau nhiều năm cải tạo.',
    wasteTonsToday: 3.1,
    status: 'improving',
    timestamp: 'Hôm nay · 16:20',
    source: 'Báo Lao Động',
    sourceUrl: 'https://laodong.vn/moi-truong',
    actionRequired: 'Duy trì tuần tra liên ngành ban đêm tại các đoạn đê bao vắng người qua lại'
  }
];
