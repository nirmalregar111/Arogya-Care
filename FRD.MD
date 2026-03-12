Frontend Requirement Document (FRD)
Product Name

Arogya Care

Product Type

AI-Based Preventive Healthcare Web Platform

Platform

Web Application

1. Frontend Objective

The frontend of Arogya Care will provide a user-friendly dashboard where users can:

Enter patient health information

View AI-generated health insights

Simulate lifestyle changes

Compare treatments

Track personalized health habits

The UI should be modern, simple, and easy for doctors and patients to use.

2. UI Design Principles
2.1 Design Goals

Simple and clean healthcare interface

Easy navigation

Fast data entry

Visual AI insights

Mobile responsive design

2.2 Color Theme

Primary Color
🔵 Medical Blue (#2563EB)

Secondary Color
🟢 Health Green (#22C55E)

Background
⚪ White / Light Gray

3. Frontend Technology Stack
Technology	Purpose
React.js	UI Framework
Tailwind CSS	Styling
Chart.js	Health graphs
Axios	API communication
React Router	Page navigation
4. Website Structure
Pages Overview

Patient Information Page

Dashboard

Digital Health Twin Simulator

Lifestyle Impact Simulator

Disease Prediction Page

Treatment Cost Optimizer

Health Habit Builder

User Profile Page

5. Page Requirements
5.1 Patient Information Page
Purpose

Collect patient data for AI analysis.

UI Components

Patient Form Fields

Name (Text input)

Age (Number input)

Gender (Dropdown)

Medical History (Textarea)

Symptoms (Multi-select)

Lab Reports (File upload)

Lifestyle Data

Lifestyle Inputs

Smoking (Yes/No)

Alcohol (Yes/No)

Exercise Level

Sleep Hours

Diet Type

Buttons

Submit → Sends data to AI system

Output

Redirect to Dashboard Page

5.2 Dashboard Page
Purpose

Main overview of patient health data.

Header Components

Logo (Arogya Care)

Navigation Menu

Patients

Reports

AI Insights

Profile

Dashboard Widgets
Patient Summary Card

Shows:

Health Score

Risk Level

Current Symptoms

Recommended Actions

Health Graph

Charts showing:

Health improvement

Risk level

Lifestyle score

5.3 Digital Health Twin Simulator Page
Purpose

Simulate treatment outcomes.

UI Components

Treatment Comparison Card

Treatment A

Improvement Percentage

Recovery Time

Treatment B

Improvement Percentage

Recovery Time

Output

AI Recommendation Card

Example

Best Treatment → Treatment B
Expected Improvement → 85%

5.4 AI Lifestyle Impact Simulator
Purpose

Show how lifestyle changes affect health.

Input Controls

Exercise Slider

Smoking Toggle

Diet Selection

Sleep Hours Slider

Output

Health Risk Change

Example

Exercise Daily
→ Heart disease risk ↓ 40%

Smoking Continues
→ Risk ↑ 65%

Charts will show risk vs lifestyle changes.

5.5 Preventive Disease Prediction Page
Purpose

Predict future disease risks.

UI Components

Prediction Card

Example Results

Kidney Disease Risk

Probability

Time Prediction

Hypertension Risk

Probability

Time Prediction

Visual Elements

Risk meter

Timeline prediction chart

5.6 Treatment Cost Optimizer Page
Purpose

Compare treatment cost vs effectiveness.

UI Components

Treatment Comparison Table

Treatment	Cost	Effectiveness
Treatment A	₹15000	High
Treatment B	₹5000	Similar
AI Recommendation Section

Recommended Treatment
→ Treatment B

Reason
→ Same effectiveness at lower cost

5.7 Personalized Health Habit Builder
Purpose

Provide daily health improvement tasks.

UI Components

Habit Timeline

Day 1
Walk 200 steps

Day 7
Reduce sugar intake

Day 14
Start strength exercise

Features

Progress bar

Habit completion checkbox

Weekly health score

5.8 Profile Page
Purpose

Manage user information.

Components

User Information

Name

Email

Age

Medical Profile

Options

Edit Profile

Logout

Download Health Report

6. Navigation Structure

Main Navigation Menu

Home / Dashboard
Patients
AI Insights
Reports
Profile

7. UI Components Library

Reusable components required:

Navbar

Sidebar

Cards

Charts

Forms

Buttons

Modals

Notification alerts

8. Responsive Design

The UI must support:

Desktop

Tablet

Mobile

Responsive breakpoints

Desktop → 1200px+
Tablet → 768px
Mobile → 480px

9. User Flow
Step 1

User enters patient information

Step 2

System generates AI analysis

Step 3

User views dashboard

Step 4

User explores simulations

Step 5

System recommends treatment and habits

10. Performance Requirements

Page load time
< 2 seconds

Smooth UI interactions

Charts should load within
1 second

11. Security Requirements

Secure form input validation

Encrypted API communication

Role-based access for doctors/patients

12. Accessibility Requirements

Readable fonts

High contrast UI

Keyboard navigation support