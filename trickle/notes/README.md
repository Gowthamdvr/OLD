# MediCare - Medical Appointment System

## Overview
A comprehensive medical appointment booking system that allows patients to schedule appointments with doctors and enables administrators to manage the system efficiently.

## Features

### 1. Admin Portal
- Manages patients and their records
- Manages doctor profiles (add/edit/delete)
- Views all appointments across the system
- Generates comprehensive PDF reports
- Tracks appointment statistics
- Full system oversight and control

### 2. Doctor Portal
- Views only their own appointments
- Approves or rejects appointment requests
- Updates personal availability slots
- Manages patient appointments
- Access to assigned patient information

### 3. Receptionist Portal
- Adds walk-in patients to the system
- Creates manual appointments
- Checks doctor availability in real-time
- Prints appointment slips
- Handles front desk operations

### 4. Patient Portal
- Books appointments with preferred doctors
- Views appointment status and history
- Manages personal profile
- Cancels scheduled appointments
- Downloads prescriptions (when available)

## System Modules

### 1. Admin Module (`admin.html`)
- System dashboard with comprehensive statistics
- Doctor profile management
- Complete appointment oversight
- PDF report generation
- Patient record access

### 2. Doctor Module (`doctor.html`)
- Personal appointment dashboard
- Appointment approval/rejection system
- Patient consultation view
- Availability management
- Prescription management

### 3. Receptionist Module (`receptionist.html`)
- Walk-in patient registration
- Quick appointment booking
- Doctor availability checker
- Appointment slip printing
- Front desk operations

### 4. Patient Module (`patient.html`)
- Online appointment booking
- Appointment history view
- Profile management
- Status tracking
- Prescription download

## Database Tables

### Doctor Table
- name: Doctor's full name
- specialty: Medical specialty
- experience: Years of experience
- availability: Working days/hours

### Appointment Table
- patientName: Patient's name
- email: Contact email
- phone: Contact phone
- doctorName: Assigned doctor
- specialty: Doctor's specialty
- date: Appointment date
- time: Appointment time
- reason: Visit reason
- status: Scheduled/Cancelled

## Technology Stack
- Frontend: React 18, TailwindCSS
- Icons: Lucide
- Database: Trickle Database
- Hosting: Trickle Platform

## Pages
- `index.html` - Landing page with system overview
- `admin.html` - Admin management portal
- `doctor.html` - Doctor appointment portal
- `receptionist.html` - Receptionist operations portal
- `patient.html` - Patient booking portal

## Usage

### For Administrators
1. Click "Admin" in the header
2. View comprehensive dashboard
3. Manage doctors and appointments
4. Generate system reports
5. Monitor all activities

### For Doctors
1. Click "Doctor" in the header
2. Select your profile to login
3. View assigned appointments
4. Approve or reject requests
5. Update availability

### For Receptionists
1. Click "Receptionist" in the header
2. Register walk-in patients
3. Create manual appointments
4. Check doctor availability
5. Print appointment slips

### For Patients
1. Click "Patient" in the header
2. Fill appointment booking form
3. Select preferred doctor
4. Choose date and time
5. Submit and track status

## Future Enhancements
- Patient authentication system
- Email/SMS notifications
- Online payment integration
- Video consultation feature
- Prescription management
- Medical records storage
- Mobile application