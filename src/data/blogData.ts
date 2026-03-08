/**
 * Blog Posts Data
 * 
 * Structure follows Firebase Firestore collection schema:
 * Collection: blog_posts
 * 
 * When migrating to Firebase:
 * 1. Create 'blog_posts' collection in Firestore
 * 2. Import this data as documents (use slug as document ID)
 * 3. Replace this file with useBlogPosts() hook using useQuery
 */

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown or HTML
  author: string;
  authorRole: string;
  featuredImage: string;
  tags: string[];
  publishedAt: string; // ISO date
  readingTime: number; // minutes
  isPublished: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "5-signs-you-need-physiotherapy",
    title: "5 Signs You Need Physiotherapy",
    excerpt: "Don't ignore these warning signs. Early intervention through physiotherapy can prevent chronic pain and long-term damage.",
    content: `
## 5 Signs You Need Physiotherapy

Many people wait too long before seeking physiotherapy, often letting minor issues develop into chronic conditions. Here are five warning signs that indicate you should consult a physiotherapist.

### 1. Persistent Pain That Won't Go Away

If you've been experiencing pain for more than a few days, especially after an injury, it's time to see a professional. Pain is your body's way of telling you something is wrong.

**What to look for:**
- Pain lasting more than 72 hours
- Pain that returns with certain movements
- Dull aches that worsen over time

### 2. Loss of Balance or Coordination

Frequent stumbling, difficulty walking in a straight line, or feeling unsteady can indicate issues with your vestibular system or muscle weakness.

**Common causes:**
- Inner ear problems
- Muscle weakness
- Neurological conditions
- Post-surgery recovery

### 3. Decreased Range of Motion

If you notice that you can't move a joint as freely as before—whether it's turning your neck, bending your knee, or reaching overhead—this is a clear sign you need intervention.

### 4. Pain While Sitting at Your Desk

Office workers often develop poor posture habits that lead to chronic neck, shoulder, and back pain. If your work setup is causing discomfort, ergonomic assessment and corrective exercises can help.

### 5. Recurring Injuries

If you keep injuring the same area—like your ankle, knee, or lower back—there's likely an underlying weakness or imbalance that needs addressing.

---

## When to Act

The sooner you address these issues, the better your outcomes. At ACUREATUS, we use AI-powered diagnostics to identify the root cause of your pain, not just treat the symptoms.

**Book a consultation today** to get a personalized treatment plan.
    `.trim(),
    author: "Dr. Sushmitha A",
    authorRole: "Clinical Director, MPT",
    featuredImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    tags: ["pain-management", "prevention", "wellness"],
    publishedAt: "2026-02-15T10:00:00Z",
    readingTime: 4,
    isPublished: true,
  },
  {
    id: "2",
    slug: "understanding-spinal-decompression-therapy",
    title: "Understanding Spinal Decompression Therapy",
    excerpt: "Learn how non-surgical spinal decompression can relieve herniated discs, sciatica, and chronic back pain without surgery.",
    content: `
## What is Spinal Decompression Therapy?

Spinal decompression is a non-surgical treatment that gently stretches the spine to relieve pressure on compressed discs and nerves. It's one of our most effective treatments for chronic back pain.

### How It Works

The therapy uses a motorized table to create negative pressure within the spinal discs. This:

1. **Pulls herniated disc material back** into place
2. **Increases blood flow** to the affected area
3. **Promotes nutrient exchange** for disc healing
4. **Reduces nerve compression**

### Conditions We Treat

- Herniated or bulging discs
- Sciatica
- Degenerative disc disease
- Spinal stenosis
- Facet joint syndrome

### What to Expect

Each session lasts 30-45 minutes. Most patients need 15-20 sessions over 4-6 weeks for optimal results. Many feel relief after just a few sessions.

### Success Rates

Studies show that 86% of patients experience significant pain reduction with spinal decompression therapy. Combined with our AI-powered diagnostics, we can precisely target the source of your pain.

---

**At ACUREATUS**, spinal decompression therapy is priced at ₹500 per session. Contact us to learn if this treatment is right for you.
    `.trim(),
    author: "Dr. Sushmitha A",
    authorRole: "Clinical Director, MPT",
    featuredImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
    tags: ["spinal-health", "treatment", "back-pain"],
    publishedAt: "2026-02-01T10:00:00Z",
    readingTime: 3,
    isPublished: true,
  },
  {
    id: "3",
    slug: "laser-therapy-benefits-pain-relief",
    title: "How Laser Therapy Accelerates Healing",
    excerpt: "Discover the science behind low-level laser therapy (LLLT) and why it's becoming a go-to treatment for pain and inflammation.",
    content: `
## The Science of Laser Therapy

Low-Level Laser Therapy (LLLT), also called cold laser or photobiomodulation, uses specific wavelengths of light to stimulate cellular repair and reduce inflammation.

### How Does It Work?

When laser light penetrates tissue, it triggers a series of biochemical reactions:

- **Increased ATP production** (cellular energy)
- **Enhanced collagen synthesis** for tissue repair
- **Reduced inflammatory markers**
- **Improved blood circulation**

### Conditions Treated

Laser therapy is effective for:

- Tendinitis (tennis elbow, Achilles)
- Arthritis pain
- Muscle strains and tears
- Post-surgical healing
- Carpal tunnel syndrome
- Sports injuries

### Treatment Experience

- **Duration:** 5-15 minutes per session
- **Sensation:** Warm, painless light application
- **Sessions needed:** 6-12 for most conditions
- **Results:** Many patients notice improvement within 3-4 sessions

### Why Choose Laser Therapy?

✓ Non-invasive and drug-free
✓ No known side effects
✓ Can be combined with other treatments
✓ Suitable for all ages

---

**ACUREATUS offers laser therapy at ₹500 per session.** It's often combined with manual therapy and exercise for comprehensive treatment.
    `.trim(),
    author: "Dr. Akash Shetty",
    authorRole: "Sports Physiotherapist",
    featuredImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80",
    tags: ["laser-therapy", "treatment", "sports-medicine"],
    publishedAt: "2026-01-20T10:00:00Z",
    readingTime: 3,
    isPublished: true,
  },
  {
    id: "4",
    slug: "desk-posture-exercises-office-workers",
    title: "5-Minute Desk Exercises to Fix Your Posture",
    excerpt: "Simple exercises you can do at your desk to combat the effects of prolonged sitting and prevent chronic pain.",
    content: `
## Combat Desk Pain in 5 Minutes

Sitting for 8+ hours a day wreaks havoc on your body. Here are quick exercises you can do without leaving your desk.

### 1. Chin Tucks (Neck Pain Relief)

**How to do it:**
1. Sit tall, looking straight ahead
2. Pull your chin back (like making a double chin)
3. Hold for 5 seconds, release
4. Repeat 10 times

**Benefits:** Corrects forward head posture, reduces neck strain

### 2. Shoulder Blade Squeezes

**How to do it:**
1. Sit upright, arms at your sides
2. Squeeze shoulder blades together
3. Hold for 5 seconds
4. Repeat 10 times

**Benefits:** Opens chest, counters rounded shoulders

### 3. Seated Spinal Twist

**How to do it:**
1. Sit sideways on your chair
2. Twist toward the backrest, hold with hands
3. Hold for 20 seconds each side

**Benefits:** Releases lower back tension, improves mobility

### 4. Wrist Circles and Stretches

**How to do it:**
1. Extend arm, palm down
2. Use other hand to gently pull fingers back
3. Hold 15 seconds, then do circles

**Benefits:** Prevents carpal tunnel, relieves typing strain

### 5. Hip Flexor Stretch

**How to do it:**
1. Stand up from your chair
2. Step one foot back, keep heel down
3. Push hips forward gently
4. Hold 20 seconds each side

**Benefits:** Releases tight hip flexors from sitting

---

## Make It a Habit

Set a timer to do these every 2 hours. Your future self will thank you!

**Need a personalized ergonomic assessment?** Book a consultation at ACUREATUS—we'll analyze your workstation and create a custom exercise plan.
    `.trim(),
    author: "Dr. Rashmi Nair",
    authorRole: "Neuro Physiotherapist",
    featuredImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
    tags: ["exercises", "office-health", "prevention"],
    publishedAt: "2026-01-10T10:00:00Z",
    readingTime: 4,
    isPublished: true,
  },
  {
    id: "5",
    slug: "sports-injury-prevention-tips",
    title: "10 Tips to Prevent Sports Injuries",
    excerpt: "Whether you're a weekend warrior or competitive athlete, these evidence-based tips will help you stay injury-free.",
    content: `
## Stay in the Game: Injury Prevention Guide

Sports injuries can sideline you for weeks or months. Here's how to minimize your risk.

### 1. Always Warm Up

A proper warm-up increases blood flow to muscles and prepares your body for activity. Spend at least 10 minutes on dynamic stretches.

### 2. Don't Skip the Cool Down

Post-exercise stretching helps prevent muscle tightness and soreness. Hold static stretches for 20-30 seconds each.

### 3. Progress Gradually

The "10% rule": Don't increase training intensity, duration, or frequency by more than 10% per week.

### 4. Cross-Train

Varying your activities prevents overuse injuries and builds balanced strength.

### 5. Use Proper Equipment

- Replace running shoes every 300-500 miles
- Wear sport-specific footwear
- Use appropriate protective gear

### 6. Stay Hydrated

Dehydration impairs performance and increases injury risk. Drink water before, during, and after exercise.

### 7. Listen to Your Body

Pain is a warning sign. "No pain, no gain" is outdated—train smart, not through injury.

### 8. Strength Train

Building muscle around joints provides stability and reduces injury risk. Focus on:
- Core stability
- Hip and glute strength
- Ankle and knee stability

### 9. Get Enough Sleep

Sleep is when your body repairs itself. Aim for 7-9 hours for optimal recovery.

### 10. Work with Professionals

Regular check-ups with a sports physiotherapist can identify and address imbalances before they become injuries.

---

**At ACUREATUS**, we offer sports-specific assessments and injury prevention programs. Our Interactive Sports Gaming therapy (₹350/session) combines rehab with engaging exercises.
    `.trim(),
    author: "Dr. Akash Shetty",
    authorRole: "Sports Physiotherapist",
    featuredImage: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
    tags: ["sports-medicine", "prevention", "fitness"],
    publishedAt: "2026-01-05T10:00:00Z",
    readingTime: 5,
    isPublished: true,
  },
];

/**
 * Helper function to get a single post by slug
 * (Will be replaced by Firestore query)
 */
export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.slug === slug && post.isPublished);
};

/**
 * Helper function to get all published posts
 * (Will be replaced by Firestore query with where('isPublished', '==', true))
 */
export const getPublishedPosts = (): BlogPost[] => {
  return blogPosts
    .filter((post) => post.isPublished)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
};

/**
 * Helper function to get posts by tag
 * (Will be replaced by Firestore query with array-contains)
 */
export const getPostsByTag = (tag: string): BlogPost[] => {
  return blogPosts
    .filter((post) => post.isPublished && post.tags.includes(tag))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
};
