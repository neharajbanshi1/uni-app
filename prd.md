# UNI Platform - Project Requirements Document

## Project Overview
Build a frontend-only prototype of UNI, a bilingual web platform addressing postpartum mental health taboos in Nepal. The prototype will demonstrate core UX/UI functionality with mock data for a 3-minute hackathon presentation. This version includes a new "Smart Search" feature to provide AI-enhanced results.

## Technical Specifications

### Technology Stack
- **Frontend**: Vanilla HTML, CSS, JavaScript
- **Styling**: Responsive design with mobile-first approach
- **Hosting**: Netlify or Vercel
- **Language**: Google Translate embed for simple language toggle
- **Data**: Mock data only (no backend required)

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive (iOS Safari, Android Chrome)

## Core Features & User Flow

### Primary User Journey
1. **Landing Page** → Use Smart Search for "feeling sad"
2. **Smart Search Results** → View personalized results
3. **Article View** → Read recommended article
4. **Community Forum** → Join relevant discussion
5. **Expert Directory** → Find an available expert

### Feature Requirements

#### 1. Language Toggle System
- **Scope**: Simple toggle button (English/Nepali)
- **Implementation**: Google Translate embed widget
- **Behavior**: Toggle between languages across all pages
- **Priority**: Critical for demo

#### 2. Articles and Guides
- **Scope**: Searchable articles with categories
- **Content**: 8-10 mock articles covering key topics
- **Features**:
  - Search functionality
  - Article categories/tags
  - Medical source citations
  - Related articles section
- **Priority**: Critical for demo

#### 3. Community Forum
- **Scope**: Browse-only mock discussions with posting functionality.
- **Features**:
  - Anonymous post listings with user avatars.
  - Discussion threads (read-only).
  - Post categories.
  - A welcoming header and enhanced "Safe Space" guidelines.
  - **New**: Users can now share their own stories. Posts are added to the top of the forum in real-time.
- **Note**: Posting is session-based; new posts are not saved permanently.
- **Priority**: Critical for demo

#### 4. Expert Directory
- **Scope**: Healthcare provider listings
- **Features**:
  - Provider profiles with photos
  - Specialties and qualifications
  - Location/contact information
  - Mock booking interface
- **Priority**: Critical for demo

#### 5. Smart Search
- **Scope**: AI-powered search connecting users to all platform resources.
- **Features**:
  - Smart search input on the landing page.
  - 3-second loading state with "Understanding your concern..." message.
  - Three-panel results display (Articles and Guides, Community, Experts).
  - AI-generated response with prioritized recommendations.
  - Contextual action buttons.
- **Priority**: Highest for demo

#### 6. Text-to-Speech Functionality
- **Scope**: A button to read the page content aloud.
- **Implementation**: Uses the browser's built-in SpeechSynthesis API.
- **Behavior**: Toggles between playing and stopping the speech. The button is available on all pages in the header.
- **Priority**: High for accessibility.

## Content Requirements

### Articles and Guides Topics
Research and create mock articles covering:

#### Medical Content
1. **Postpartum Depression Overview**
   - Symptoms and recognition
   - Difference from "baby blues"
   - When to seek help

2. **Cultural Myths & Facts**
   - "New mothers should always be happy"
   - "Mental health issues are weakness"
   - "Postpartum depression is rare"

3. **Sutkeri Practices Analysis**
   - Traditional confinement benefits
   - Potential mental health risks
   - Modern adaptations

#### Practical Guides
4. **Self-Care Strategies**
   - Daily routines for mental wellness
   - Nutrition and exercise
   - Sleep hygiene

5. **Family Support**
   - How relatives can help
   - Recognizing warning signs
   - Communication strategies

6. **Professional Help**
   - Types of mental health providers
   - What to expect in therapy
   - Medication considerations

### Community Forum Mock Posts

#### Anonymous Concerns
1. **"Feeling overwhelmed after delivery"**
   - Thread with supportive responses
   - Cultural context about expectations

2. **"Mother-in-law says I'm being dramatic"**
   - Discussion about family dynamics
   - Validation and advice

3. **"Can't bond with my baby"**
   - Sensitive topic with professional guidance
   - Reassurance about normalcy

#### Cultural Conflicts
4. **"Sutkeri restrictions making me feel trapped"**
   - Balancing tradition with mental health
   - Modern adaptations discussed

5. **"Husband doesn't understand postpartum depression"**
   - Partner education resources
   - Communication strategies

### Healthcare Provider Profiles

#### Provider Types
1. **Psychiatrists** (2-3 profiles)
   - Hospital affiliations
   - Specializations in perinatal mental health

2. **Clinical Psychologists** (2-3 profiles)
   - Private practice
   - Therapy approaches

3. **Counselors** (2-3 profiles)
   - Community health centers
   - Cultural sensitivity training

#### Profile Information
- Professional headshot (stock photos)
- Name and credentials
- Specialties
- Years of experience
- Languages spoken
- Consultation fees
- Location (Kathmandu Valley focus)
- Contact information
- Mock availability calendar

## UI/UX Requirements

### Design Principles
- **Calming Color Palette**: Soft blues, greens, warm neutrals
- **Accessible Typography**: Clear, readable fonts
- **Cultural Sensitivity**: Appropriate imagery and language
- **Trust Building**: Professional design with medical credibility

### Key Pages Layout

#### 1. Landing Page
- Hero section with mission statement
- Language toggle prominently displayed
- Quick access to all main features
- Statistics about postpartum depression in Nepal

#### 2. Articles and Guides
- Search bar with placeholder text
- Category filters
- Article grid with thumbnails
- Featured/trending articles section

#### 3. Article View
- Clean reading experience
- Medical source citations
- Related articles sidebar
- Social sharing buttons (mock)

#### 4. Community Forum
- Welcoming header with an introductory message.
- Enhanced "Safe Space" guidelines to foster trust.
- Discussion categories for filtering posts.
- Anonymous post previews with user avatars to create a sense of presence.
- A "Share Your Story" form that allows for real-time, anonymous posting.

#### 5. Expert Directory
- Provider grid with photos
- Filter by specialty/location
- Quick contact options
- Booking interface

### Mobile Responsiveness
- Touch-friendly navigation
- Readable text sizing
- Optimized images
- Fast loading times

## Technical Implementation Notes

### File Structure
```
/
  - index.html (landing)
  - articles-and-guides.html
  - article.html
  - forum.html
  - experts.html
  - expert-profile.html
  - smart-search.html
  /components
    - header.html
  /src
    /css
      - styles.css
      - responsive.css
      - search.css
    /js
      - main.js
      - search.js
      - language-toggle.js
  /assets
    - /images
    - /data (mock JSON files)
```

### Mock Data Structure
- **Articles**: JSON with title, content, author, date, category, `type`, and `tags`.
- **Forum Posts**: JSON with anonymous ID, title, content, replies, `tags`, and `activity`.
- **Providers**: JSON with profile details, specialties, contact info, `availability`, and `rating`.

### Performance Considerations
- Optimize images for web
- Minimize CSS/JS file sizes
- Use semantic HTML for accessibility
- Implement lazy loading for images

## Success Criteria

### Demo Functionality
- [ ] Language toggle works across all pages
- [x] Search returns relevant results
- [x] Smart Search processes query and displays three panels.
- [x] AI response generates appropriate recommendations.
- [x] Action buttons are displayed.
- [x] All navigation links functional
- [x] Responsive design on mobile/desktop
- [x] Professional visual design
- [x] Cultural authenticity in content

### User Experience
- [ ] Intuitive navigation flow
- [ ] Fast loading times
- [ ] Clear information hierarchy
- [ ] Trustworthy medical presentation
- [ ] Culturally sensitive design

## Deliverables

### Primary Deliverable
- Fully functional frontend prototype
- Deployed on Netlify/Vercel
- Demo-ready with stable performance

### Documentation
- README with setup instructions
- Code comments for maintainability
- Brief technical architecture overview

### Demo Preparation
- Tested user flow walkthrough
- Backup local version
- Performance optimized
- Cross-browser tested

## Timeline Expectations
This prototype should be buildable within a hackathon timeframe (24-48 hours) by focusing on:
1. Core user flow implementation
2. Professional visual design
3. Mock data integration
4. Responsive functionality
5. Demo optimization

## Additional Notes
- Prioritize working demo over complex features
- Focus on user experience that tells the story
- Ensure all demonstrated features actually work
- Cultural authenticity is key differentiator
- Medical credibility through design and content