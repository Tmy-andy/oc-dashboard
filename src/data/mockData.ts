import { User } from '../types/user';
import { OC, OCFeature, OCPost } from '../types/oc';

// Mock User Data
export const mockUser: User = {
  id: 'user-1',
  email: 'admin@ocmanager.com',
  name: 'Nguyễn Minh Tuấn',
  avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  role: 'admin',
  created_at: '2024-01-15T08:00:00Z',
  updated_at: '2024-09-15T10:30:00Z',
  preferences: {
    theme: 'light',
    language: 'vi',
    notifications: true
  }
};

// Mock OCs Data
export const mockOCs: OC[] = [
  {
    id: 'oc-1',
    name: 'Luna Nightshade',
    age: '23',
    gender: 'Female',
    description: 'Luna là một phù thủy trẻ tuổi với khả năng điều khiển bóng tối và ánh trăng. Cô sinh ra trong một gia đình phù thủy danh giá nhưng lại chọn con đường riêng của mình. Với mái tóc bạc ánh trăng và đôi mắt tím huyền bí, Luna luôn thu hút sự chú ý của những người xung quanh.\n\nTính cách của cô vừa bí ẩn vừa ấm áp. Luna có thể lạnh lùng và xa cách với người lạ, nhưng với những người bạn thân, cô là người rất trung thành và bảo vệ. Cô có sở thích đọc sách cổ về ma thuật và thường xuyên thực hiện các nghi lễ dưới ánh trăng tròn.',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
    banner_url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=400&fit=crop',
    status: 'active',
    created_at: '2024-01-20T10:00:00Z',
    updated_at: '2024-09-10T14:30:00Z',
    metadata: {
      source: 'original_creation_2024',
      tags: ['phù thủy', 'bóng tối', 'ánh trăng', 'bí ẩn', 'ma thuật'],
      category: 'main'
    }
  },
  {
    id: 'oc-2',
    name: 'Troy Ashford',
    age: '28',
    gender: 'Male',
    description: 'Troy là một chiến binh kinh nghiệm với khả năng sử dụng mọi loại vũ khí. Anh từng là một hiệp sĩ của vương quốc Eldoria nhưng đã trở thành một lãng khách sau khi vương quốc sụp đổ. Troy có thân hình cao lớn, vạm vỡ với những vết scar từ các trận chiến.\n\nTrong quá khứ, Troy là người dẫn đầu một đội hiệp sĩ tinh nhuệ, nhưng sau thảm kịch của vương quốc, anh đã mất đi niềm tin vào chính nghĩa. Giờ đây, Troy lang thang khắp nơi, làm công việc thuê mướn để kiếm sống, nhưng trong sâu thẳm vẫn còn giữ lửa hy vọng về một tương lai tốt đẹp hơn.',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    banner_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop',
    status: 'active',
    created_at: '2024-02-05T09:15:00Z',
    updated_at: '2024-09-12T16:45:00Z',
    metadata: {
      source: 'character_concept_art',
      tags: ['chiến binh', 'hiệp sĩ', 'lãng khách', 'kiếm sĩ', 'bi kịch'],
      category: 'main'
    }
  },
  {
    id: 'oc-3',
    name: 'Yuri Sakamoto',
    age: '19',
    gender: 'Female',
    description: 'Yuri là một học sinh trung học Nhật Bản với khả năng đặc biệt là có thể nhìn thấy và giao tiếp với linh hồn. Cô có vẻ ngoài nhẹ nhàng với mái tóc đen dài và đôi mắt nâu ấm áp. Yuri thường mặc đồng phục học sinh và luôn mang theo một chiếc túi nhỏ chứa các vật phẩm tâm linh.\n\nDù còn trẻ tuổi, Yuri đã trải qua nhiều trải nghiệm siêu nhiên và học được cách kiểm soát khả năng của mình. Cô là người hiền lành, luôn sẵn sàng giúp đỡ những linh hồn lạc lối tìm được bình yên. Tuy nhiên, khả năng này đôi khi khiến cô cảm thấy cô đơn và khác biệt so với bạn bè cùng trang lứa.',
    avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
    banner_url: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&h=400&fit=crop',
    status: 'draft',
    created_at: '2024-03-10T11:20:00Z',
    updated_at: '2024-09-08T13:15:00Z',
    metadata: {
      source: 'anime_inspired',
      tags: ['học sinh', 'siêu nhiên', 'linh hồn', 'Nhật Bản', 'trẻ trung'],
      category: 'supporting'
    }
  },
  {
    id: 'oc-4',
    name: 'Marcus Blackwood',
    age: '35',
    gender: 'Male',
    description: 'Marcus là một thám tử tư có khả năng phân tích và suy luận xuất sắc. Anh từng là một cảnh sát ưu tú nhưng đã rời khỏi lực lượng sau một vụ án gây tranh cãi. Giờ đây, Marcus làm việc như một thám tử tư, chuyên nhận những vụ án phức tạp mà cảnh sát không thể giải quyết.\n\nMarcus có ngoại hình lịch lãm với bộ vest đen, mái tóc hơi bạc và đôi mắt xanh sắc bén. Anh luôn mang theo một chiếc đồng hồ cổ - món quà từ người cha đã khuất. Tính cách của Marcus khá khô khan và nghiêm túc, nhưng anh có trái tim ấm áp và luôn đấu tranh cho công lý.',
    avatar_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
    status: 'inactive',
    created_at: '2024-02-28T14:30:00Z',
    updated_at: '2024-08-15T09:20:00Z',
    metadata: {
      source: 'detective_noir_concept',
      tags: ['thám tử', 'bí ẩn', 'noir', 'thông minh', 'công lý'],
      category: 'main'
    }
  }
];

// Mock Features Data
export const mockFeatures: OCFeature[] = [
  {
    id: 'feature-1',
    oc_id: 'oc-1',
    title: 'Grimoire của Luna',
    description: 'Cuốn sách phép thuật cổ của Luna chứa đựng những bài niệm thần chú và kiến thức về ma thuật bóng tối.',
    icon: 'fa-book',
    color: '#6B46C1',
    status: 'active',
    slug: 'luna-grimoire',
    target: '_self',
    banner_images: [
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=400&fit=crop'
    ]
  },
  {
    id: 'feature-2',
    oc_id: 'oc-1',
    title: 'Nghi lễ Trăng Tròn',
    description: 'Những nghi lễ đặc biệt mà Luna thực hiện dưới ánh trăng tròn để tăng cường sức mạnh phép thuật.',
    icon: 'fa-magic',
    color: '#7C3AED',
    status: 'active',
    slug: 'moon-ritual',
    target: '_self'
  },
  {
    id: 'feature-3',
    oc_id: 'oc-2',
    title: 'Võ khí & Trang bị',
    description: 'Bộ sưu tập vũ khí và trang bị chiến đấu của Troy từ thời kỳ làm hiệp sĩ.',
    icon: 'fa-sword',
    color: '#DC2626',
    status: 'active',
    slug: 'troy-weapons',
    target: '_self'
  },
  {
    id: 'feature-4',
    oc_id: 'oc-2',
    title: 'Ký ức Eldoria',
    description: 'Những kỷ niệm và câu chuyện về vương quốc Eldoria đã mất của Troy.',
    icon: 'fa-crown',
    color: '#F59E0B',
    status: 'active',
    slug: 'eldoria-memories',
    target: '_self'
  },
  {
    id: 'feature-5',
    oc_id: 'oc-3',
    title: 'Nhật ký Tâm Linh',
    description: 'Nhật ký ghi lại những lần gặp gỡ với linh hồn và trải nghiệm siêu nhiên của Yuri.',
    icon: 'fa-heart',
    color: '#EC4899',
    status: 'active',
    slug: 'yuri-diary',
    target: '_self'
  },
  {
    id: 'feature-6',
    oc_id: 'oc-3',
    title: 'Vật phẩm Phong Thủy',
    description: 'Các vật phẩm tâm linh mà Yuri sử dụng để giao tiếp với thế giới bên kia.',
    icon: 'fa-star',
    color: '#8B5CF6',
    status: 'inactive',
    slug: 'spiritual-items',
    target: '_self'
  },
  {
    id: 'feature-7',
    oc_id: 'oc-4',
    title: 'Hồ sơ Vụ án',
    description: 'Tổng hợp các vụ án mà Marcus đã giải quyết trong sự nghiệp thám tử.',
    icon: 'fa-shield',
    color: '#059669',
    status: 'active',
    slug: 'case-files',
    target: '_self'
  }
];

// Mock Posts Data
export const mockPosts: OCPost[] = [
  {
    id: 'post-1',
    feature_id: 'feature-1',
    locale: 'vi',
    title: 'Chương I: Nguồn gốc của Grimoire',
    content: 'Cuốn Grimoire này được truyền từ đời này sang đời khác trong dòng họ Nightshade. Nó chứa đựng những bài niệm thần chú cổ xưa và kiến thức sâu sắc về ma thuật bóng tối...',
    excerpt: 'Khám phá nguồn gốc của cuốn sách phép thuật cổ và những bí mật ẩn giấu bên trong.',
    status: 'published',
    created_at: '2024-08-01T10:00:00Z',
    updated_at: '2024-09-01T14:30:00Z'
  },
  {
    id: 'post-2',
    feature_id: 'feature-1',
    locale: 'en',
    title: 'Chapter I: The Origin of the Grimoire',
    content: 'This Grimoire has been passed down through generations in the Nightshade family. It contains ancient incantations and deep knowledge about dark magic...',
    excerpt: 'Discover the origins of the ancient spellbook and the secrets hidden within.',
    status: 'published',
    created_at: '2024-08-01T10:05:00Z',
    updated_at: '2024-09-01T14:35:00Z'
  },
  {
    id: 'post-3',
    feature_id: 'feature-2',
    locale: 'vi',
    title: 'Nghi lễ đầu tiên dưới Trăng tròn',
    content: 'Đêm trăng tròn đầu tiên kể từ khi Luna thức tỉnh sức mạnh của mình. Cô đứng giữa vòng tròn phấn trắng, với những ngọn nến được thắp sáng xung quanh...',
    excerpt: 'Câu chuyện về lần đầu tiên Luna thực hiện nghi lễ trăng tròn.',
    status: 'published',
    created_at: '2024-08-15T20:00:00Z',
    updated_at: '2024-09-10T22:15:00Z'
  },
  {
    id: 'post-4',
    feature_id: 'feature-3',
    locale: 'vi',
    title: 'Thanh kiếm Eldoria',
    content: 'Thanh kiếm này từng thuộc về Vua Aldric III của Eldoria, được trao cho Troy như một phần thưởng cho sự trung thành. Lưỡi kiếm được rèn từ thép Mithril...',
    excerpt: 'Chi tiết về thanh kiếm hoàng gia mà Troy sở hữu.',
    status: 'published',
    created_at: '2024-07-20T15:30:00Z',
    updated_at: '2024-08-25T11:20:00Z'
  },
  {
    id: 'post-5',
    feature_id: 'feature-4',
    locale: 'vi',
    title: 'Ngày cuối cùng của Eldoria',
    content: 'Ngày đó, bầu trời như nhuộm màu đỏ bởi khói lửa. Troy đứng trên thành lũy, nhìn những kẻ thù tràn vào thủ đô. Đó là ngày cuối cùng của một vương quốc vĩ đại...',
    excerpt: 'Hồi ức đau buồn về ngày cuối cùng của vương quốc Eldoria.',
    status: 'draft',
    created_at: '2024-09-01T09:00:00Z',
    updated_at: '2024-09-15T16:45:00Z'
  },
  {
    id: 'post-6',
    feature_id: 'feature-5',
    locale: 'vi',
    title: 'Lần gặp đầu tiên',
    content: 'Hôm nay trong lớp học, em lại nhìn thấy một bóng trắng ngồi ở góc phòng. Lần này, linh hồn đó dường như biết em có thể thấy được và đã cố gắng giao tiếp...',
    excerpt: 'Nhật ký về lần đầu tiên Yuri giao tiếp với một linh hồn.',
    status: 'published',
    created_at: '2024-08-20T16:30:00Z',
    updated_at: '2024-09-05T10:15:00Z'
  },
  {
    id: 'post-7',
    feature_id: 'feature-7',
    locale: 'vi',
    title: 'Vụ án Kim cương mất tích',
    content: 'Một viên kim cương trị giá 2 triệu đô la đã biến mất khỏi két sắt được bảo vệ nghiêm ngặt. Không có dấu hiệu đột nhập, nhưng Marcus đã phát hiện ra...',
    excerpt: 'Vụ án phức tạp đầu tiên trong sự nghiệp thám tử tư của Marcus.',
    status: 'published',
    created_at: '2024-07-10T13:20:00Z',
    updated_at: '2024-08-30T17:50:00Z'
  }
];

// Helper function to get posts by feature ID
export const getPostsByFeatureId = (featureId: string): OCPost[] => {
  return mockPosts.filter(post => post.feature_id === featureId);
};

// Helper function to get features by OC ID
export const getFeaturesByOCId = (ocId: string): OCFeature[] => {
  return mockFeatures.filter(feature => feature.oc_id === ocId);
};

// Helper function to get OC by ID
export const getOCById = (ocId: string): OC | undefined => {
  return mockOCs.find(oc => oc.id === ocId);
};