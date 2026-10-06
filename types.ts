export interface TeamMember {
  id: number;
  name: string;
  role: string;
  responsibility: string;
  avatar: string;
  linkedin: string;
  github: string;
  facebook: string;
  bioSnippet: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  location: string;
  imageUrl: string;
  caption: string;
  source: 'WWF' | 'UNEP' | 'Bộ TN&MT' | 'Báo Tuổi Trẻ' | 'GreenHub';
  sourceUrl: string;
  category: 'Đại dương' | 'Đô thị' | 'Kênh rạch' | 'Sinh thái';
  year: number;
}

export interface BeforeAfterItem {
  id: string;
  title: string;
  location: string;
  beforeImg: string;
  afterImg: string;
  beforeLabel: string;
  afterLabel: string;
  description: string;
  source: string;
  sourceUrl: string;
}

export type SolutionLevel = 'individual' | 'business' | 'government';

export interface SolutionItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  metrics?: string;
  keyPoints: string[];
}

export interface CleanupDetails {
  eventDate: string;
  meetingPoint: string;
  coordinatorName: string;
  coordinatorContact: string;
  targetWaste: string;
  requiredGear: string[];
  schedule: string[];
  sponsorsOrPartners?: string;
  resultSummary?: string;
}

export interface WasteHotspot {
  id: string;
  title: string;
  locationName: string;
  lat: number;
  lng: number;
  severity: 'critical' | 'moderate' | 'cleaned';
  description: string;
  imageUrl: string;
  reportedAt: string;
  reportedBy: string;
  upvotes: number;
  hasUpvoted?: boolean;
  volunteersNeeded: number;
  volunteersJoined: number;
  statusText: string;
  cleanupDetails?: CleanupDetails;
}

export interface VolunteerFormData {
  hotspotId: string;
  hotspotTitle: string;
  fullName: string;
  phone: string;
  email: string;
  availableDate: string;
  notes: string;
}
