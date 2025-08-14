# Discourse Frontend

A modern, Reddit-like social media mobile application built with React Native, Expo, and TypeScript. Features a beautiful, responsive UI with dark/light theme support and real-time messaging capabilities.

## 🚀 Features

- **📱 Mobile-First Design** - Optimized for mobile devices with responsive layouts
- **🌙 Dark/Light Theme** - Automatic theme switching with system preferences
- **💬 Real-time Messaging** - WebSocket-powered chat system
- **📝 Post Management** - Create, view, and interact with posts
- **🏘️ Community System** - Subreddit-like communities with member management
- **👤 User Profiles** - Comprehensive user profiles with stats and activity
- **🔍 Search & Discovery** - Advanced search and content discovery
- **📊 Interactive Elements** - Voting, commenting, and sharing functionality
- **🔄 Pull-to-Refresh** - Smooth content refreshing
- **⚡ Performance Optimized** - Fast loading and smooth animations

## 📱 Screenshots

*Screenshots will be added here showing the app's interface*

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development) or Android Studio (for Android development)
- Physical device with Expo Go app (for testing)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd discourse-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   expo start
   ```

4. **Run on device/simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your phone

## 📁 Project Structure

```
discourse-frontend/
├── app/                    # Main application directory
│   ├── _layout.tsx        # Root layout component
│   ├── index.tsx          # Entry point
│   ├── auth/              # Authentication screens
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── otp.tsx
│   ├── home/              # Main app screens
│   │   ├── _layout.tsx    # Tab navigation layout
│   │   ├── index.tsx      # Home/explore screen
│   │   ├── create.tsx     # Create post screen
│   │   ├── explore.tsx    # Enhanced explore screen
│   │   ├── messages.tsx   # Messaging screen
│   │   ├── notifications.tsx
│   │   ├── profile.tsx    # User profile screen
│   │   └── search.tsx     # Search functionality
│   ├── posts/             # Post-related screens
│   │   └── [id].tsx       # Individual post view
│   ├── users/             # User-related screens
│   │   └── index.tsx      # User list/search
│   ├── components/        # Reusable components
│   │   ├── CommunityCard.tsx
│   │   ├── Header.tsx
│   │   └── PostCard.tsx
│   ├── lib/               # Utility libraries
│   │   └── api.ts         # API client
│   ├── styles/            # Global styles
│   └── theme/             # Theme configuration
│       ├── darkTheme.ts
│       ├── lightTheme.ts
│       ├── ThemeProvider.tsx
│       ├── themeStore.ts
│       └── types.ts
├── assets/                # Static assets
│   ├── fonts/            # Custom fonts
│   └── images/           # Images and icons
├── package.json
├── app.json              # Expo configuration
├── tsconfig.json
└── README.md
```

## 🎨 Theme System

The app features a comprehensive theme system with:

### Color Schemes
- **Light Theme**: Clean, bright interface
- **Dark Theme**: Easy on the eyes, modern look
- **System Theme**: Automatically follows device preferences

### Theme Properties
```typescript
{
  colors: {
    primary: string;
    background: string;
    text: string;
    textSecondary: string;
    border: string;
    upvote: string;
    downvote: string;
    // ... more colors
  },
  typography: {
    sizes: { xs, sm, md, lg, xl, xxl, xxxl };
    weights: { regular, medium, semibold, bold };
  },
  spacing: { xxs, xs, sm, md, lg, xl, xxl };
  radii: { sm, md, lg, full };
  shadows: { xs, sm, md, lg };
}
```

## 🔌 API Integration

The app connects to the Discourse Backend API with the following features:

### API Client (`lib/api.ts`)
- Centralized API calls
- Error handling
- Request/response interceptors
- WebSocket connection management

### Endpoints Used
- **Posts**: CRUD operations, voting, comments
- **Communities**: Browse and create communities
- **Messaging**: Real-time chat functionality
- **User Profiles**: Profile management and stats
- **Authentication**: Login/register (mock implementation)

## 📱 Key Screens

### 🏠 Explore Screen (`home/explore.tsx`)
- Reddit-like home feed
- Post creation modal with multiple types (text, image, link)
- Community creation functionality
- Sorting options (Hot, New, Top)
- Pull-to-refresh
- Infinite scrolling

### 💬 Messages Screen (`home/messages.tsx`)
- Conversation list with unread indicators
- Real-time chat interface
- Message bubbles with timestamps
- Online status indicators
- New message creation

### 👤 Profile Screen (`home/profile.tsx`)
- User statistics (karma, posts, comments, awards)
- Tabbed content (Posts, Comments, Upvoted)
- Profile editing modal
- Theme switching
- Settings access

### 📝 Post Detail (`posts/[id].tsx`)
- Full post view with comments
- Voting functionality
- Comment threading
- Share options
- Related content

## 🎯 Core Components

### PostCard Component
```typescript
interface PostCardProps {
  post: PostData;
  onVote: (direction: 'up' | 'down') => void;
  onPress: () => void;
}
```

### CommunityCard Component
```typescript
interface CommunityCardProps {
  community: Community;
  memberCount: number;
  onPress: () => void;
}
```

### Header Component
```typescript
interface HeaderProps {
  title?: string;
  showSearch?: boolean;
  showProfile?: boolean;
  onSearchPress?: () => void;
  onProfilePress?: () => void;
}
```

## 🔧 Configuration

### Expo Configuration (`app.json`)
```json
{
  "expo": {
    "name": "Discourse",
    "slug": "discourse-frontend",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      }
    }
  }
}
```

## 🚀 Development

### Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run in web browser
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Environment Variables

Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_API_URL=http://localhost:8000
EXPO_PUBLIC_WS_URL=ws://localhost:8000
```

## 📱 Platform Support

- **iOS**: iOS 12.0 and later
- **Android**: Android 5.0 (API level 21) and later
- **Web**: Modern browsers (Chrome, Firefox, Safari, Edge)

## 🎨 UI/UX Features

### Design Principles
- **Consistency**: Unified design language across all screens
- **Accessibility**: Support for screen readers and accessibility features
- **Performance**: Optimized rendering and smooth animations
- **Responsiveness**: Adapts to different screen sizes and orientations

### Interactive Elements
- **Haptic Feedback**: Tactile responses for important actions
- **Smooth Animations**: Fluid transitions between screens
- **Gesture Support**: Swipe gestures for navigation
- **Loading States**: Skeleton screens and loading indicators

## 🔒 Security & Privacy

- **API Security**: Secure communication with backend
- **Data Privacy**: User data protection
- **Input Validation**: Client-side validation for forms
- **Error Handling**: Graceful error handling and user feedback

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

## 📦 Building for Production

### Android APK
```bash
expo build:android
```

### iOS IPA
```bash
expo build:ios
```

### Web Build
```bash
expo build:web
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error boundaries
- Write meaningful commit messages
- Add tests for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🔄 Version History

- **v1.0.0** - Initial release with basic functionality
- **v1.1.0** - Added messaging and enhanced UI
- **v1.2.0** - Improved performance and added new features

## 🙏 Acknowledgments

- **Expo** for the amazing development platform
- **React Native** for the mobile framework
- **TypeScript** for type safety
- **Expo Router** for navigation
- **Expo Vector Icons** for beautiful icons

---

**Built with ❤️ using React Native, Expo, and TypeScript**
