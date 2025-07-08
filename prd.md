# UNI Platform - Project Requirements Document

## Project Overview
Build a frontend-only prototype of UNI, a bilingual web platform addressing postpartum mental health taboos in Nepal. The prototype will demonstrate core UX/UI functionality with mock data for a 3-minute hackathon presentation.

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
1. **Landing Page** → Language selection
2. **Knowledge Base** → Search "postpartum depression" 
3. **Article View** → Read myth-busting content
4. **Community Forum** → Browse anonymous discussions
5. **Expert Directory** → View healthcare providers
6. **Expert Profile** → Contact form (mock)

### Feature Requirements

#### 1. Language Toggle System
- **Scope**: Simple toggle button (English/Nepali)
- **Implementation**: Google Translate embed widget
- **Behavior**: Toggle between languages across all pages
- **Priority**: Critical for demo

#### 2. Knowledge Base
- **Scope**: Searchable articles with categories
- **Content**: 8-10 mock articles covering key topics
- **Features**: 
  - Search functionality
  - Article categories/tags
  - Medical source citations
  - Related articles section
- **Priority**: Critical for demo

#### 3. Community Forum
- **Scope**: Browse-only mock discussions
- **Features**:
  - Anonymous post listings
  - Discussion threads (read-only)
  - Post categories
  - Safe space indicators
- **No posting functionality required**
- **Priority**: Critical for demo

#### 4. Expert Directory
- **Scope**: Healthcare provider listings
- **Features**:
  - Provider profiles with photos
  - Specialties and qualifications
  - Location/contact information
  - Mock booking interface
- **Priority**: Critical for demo

## Content Requirements

### Knowledge Base Topics
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

#### 2. Knowledge Base
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
- Discussion categories
- Anonymous post previews
- Safe space guidelines
- Community rules

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
/src
  /html
    - index.html (landing)
    - knowledge-base.html
    - article.html
    - forum.html
    - experts.html
    - expert-profile.html
  /css
    - styles.css
    - responsive.css
  /js
    - main.js
    - search.js
    - language-toggle.js
  /assets
    - /images
    - /data (mock JSON files)
```

### Mock Data Structure
- **Articles**: JSON with title, content, author, date, category
- **Forum Posts**: JSON with anonymous ID, title, content, replies
- **Providers**: JSON with profile details, specialties, contact info

### Performance Considerations
- Optimize images for web
- Minimize CSS/JS file sizes
- Use semantic HTML for accessibility
- Implement lazy loading for images

## Success Criteria

### Demo Functionality
- [ ] Language toggle works across all pages
- [ ] Search returns relevant results
- [ ] All navigation links functional
- [ ] Responsive design on mobile/desktop
- [ ] Professional visual design
- [ ] Cultural authenticity in content

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