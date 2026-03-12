Architecture Flow Diagram (AFD)
Product: Arogya Care

System Type: AI-Based Preventive Healthcare Web Platform

1. High Level Architecture Flow
User (Patient / Doctor)
        │
        ▼
Frontend (Web Application)
React.js + Tailwind UI
        │
        ▼
API Gateway / Backend Server
Node.js + Express
        │
        ▼
Business Logic Layer
(Data Processing & Validation)
        │
        ▼
AI Processing Layer
(Python ML Models)
        │
        ▼
Database Layer
MongoDB / Firebase
        │
        ▼
Results Returned to Frontend
(Dashboard + AI Insights)
2. Detailed System Architecture Flow
User
 │
 │ Enter Patient Information
 ▼
Frontend UI
(Patient Form Page)
 │
 │ API Request
 ▼
Backend API Server
(Node.js / Express)
 │
 │ Validate Data
 ▼
Data Processing Layer
 │
 │ Store Patient Data
 ▼
Database (MongoDB)
 │
 │ Send Data to AI Models
 ▼
AI Engine (Python)
 │
 ├── Disease Prediction Model
 │
 ├── Lifestyle Impact Model
 │
 ├── Digital Health Twin Simulator
 │
 └── Treatment Cost Optimizer
 │
 ▼
AI Results Generated
 │
 │ Store Results
 ▼
Database
 │
 │ Send Response
 ▼
Backend API
 │
 │ JSON Response
 ▼
Frontend Dashboard
 │
 ▼
User Views AI Insights
3. Module Level Flow
1️⃣ Patient Data Input

User enters:

Name

Age

Gender

Medical History

Symptoms

Lab Reports

Lifestyle Data

Flow:

User Input
   ↓
Frontend Form
   ↓
API Request
   ↓
Backend Validation
   ↓
Database Storage
4. AI Disease Prediction Flow
Patient Data
     ↓
Data Processing
     ↓
Machine Learning Model
     ↓
Disease Risk Calculation
     ↓
Prediction Result
     ↓
Send to Dashboard

Example Output

Kidney Disease Risk

Hypertension Risk

Diabetes Risk

5. Digital Health Twin Simulation Flow
Patient Health Profile
        ↓
Create Digital Health Twin
        ↓
Simulate Treatment Options
        ↓
Compare Outcomes
        ↓
Return Best Treatment

Example

Treatment A → 65% improvement
Treatment B → 85% improvement

6. Lifestyle Impact Simulation Flow
Lifestyle Inputs
(Exercise / Smoking / Diet)
        ↓
Lifestyle AI Model
        ↓
Health Risk Recalculation
        ↓
Risk Change Prediction
        ↓
Display Results

Example

Exercise Daily → Risk ↓ 40%
Smoking Continues → Risk ↑ 65%

7. Treatment Cost Optimization Flow
Treatment Options
        ↓
Cost Comparison Engine
        ↓
Effectiveness Evaluation
        ↓
Cost vs Benefit Analysis
        ↓
AI Recommendation

Example

Treatment A → ₹15000/month
Treatment B → ₹5000/month

Recommendation → Treatment B

8. Personalized Habit Builder Flow
Patient Lifestyle Data
        ↓
AI Habit Recommendation Model
        ↓
Health Improvement Plan
        ↓
Daily Habit Timeline
        ↓
Send to User Dashboard

Example

Day 1 → Walk 200 steps
Day 7 → Reduce sugar
Day 14 → Strength training

9. Database Flow

Database stores:

Users Collection

User ID

Name

Email

Role

Patients Collection

Patient Details

Medical History

Lifestyle Data

Reports Collection

Lab Reports

Upload Date

Predictions Collection

Disease Predictions

AI Insights

10. Security Flow
User Login
   ↓
Authentication Server
   ↓
Token Generated
   ↓
Secure API Requests
   ↓
Encrypted Data Transfer

Security Methods

JWT Authentication

Password Hashing

HTTPS API Calls

11. System Response Flow
AI Results Generated
      ↓
Backend API Response
      ↓
Frontend Dashboard
      ↓
Charts + Insights Display
      ↓
User Decision Support
12. Deployment Architecture
Frontend
(React Web App)
     │
     ▼
CDN / Hosting
(Vercel / Netlify)
     │
     ▼
Backend Server
(Node.js API)
     │
     ▼
AI Server
(Python ML Models)
     │
     ▼
Database
(MongoDB / Firebase)
13. Arogya Care Architecture Summary

The system works in 5 main layers:

1️⃣ User Interface Layer
2️⃣ API Backend Layer
3️⃣ Business Logic Layer
4️⃣ AI Intelligence Layer
5️⃣ Database Storage Layer

This layered architecture ensures:

Scalability

Security

Fast AI predictions

Easy maintenance