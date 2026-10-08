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
  source: string;
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
  status?: 'pending_verification' | 'in_progress' | 'critical' | 'moderate' | 'cleaned';
  isPendingVerification?: boolean;
  verifiedBy?: string;
  verifiedAt?: string;
  verificationNote?: string;
  cleanupDetails?: CleanupDetails;
}

export interface DailyPlasticNewsItem {
  id: string;
  title: string;
  district: string;
  summary: string;
  wasteTonsToday: number;
  status: 'critical' | 'warning' | 'improving' | 'normal';
  timestamp: string;
  source: string;
  sourceUrl: string;
  actionRequired: string;
}

export interface VolunteerFormData {
  id?: string;
  hotspotId: string;
  hotspotTitle: string;
  hotspotLocation?: string;
  fullName: string;
  phone: string;
  email: string;
  availableDate: string;
  notes: string;
  createdAt?: string;
  status?: 'confirmed' | 'pending' | 'completed';
}
