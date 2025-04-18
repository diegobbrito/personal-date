# Personal Date: A Modern Event Planning and Invitation Management System

Personal Date is a full-stack application that streamlines the event planning process by providing a seamless way to create, manage, and respond to event invitations. The system combines a Spring Boot backend with a React frontend to deliver a robust and user-friendly experience for organizing personal events and managing RSVPs.

The application enables users to create customized event invitations, select meeting times, and track responses in real-time. It features an automated email notification system, secure data storage with PostgreSQL, and a responsive web interface. The system is containerized using Docker and supports deployment to OpenShift, making it highly scalable and maintainable.

## Repository Structure
```
.
├── backend/                      # Backend service implementation
│   └── personal-date/           # Spring Boot application
│       ├── config/              # Configuration files for code quality tools
│       ├── db/                  # Database schema and migrations
│       ├── k8s/                 # Kubernetes deployment configurations
│       └── src/                 # Source code
│           └── main/
│               ├── java/        # Java application code
│               │   └── com/team3/personal_date/
│               │       ├── api/         # REST controllers and DTOs
│               │       ├── core/        # Business logic and entities
│               │       └── gateway/     # Data access layer
│               └── resources/   # Application properties
└── frontend/                    # React frontend application
    ├── src/
    │   ├── components/         # Reusable UI components
    │   ├── pages/             # Page components
    │   └── App.tsx            # Main application component
    └── vite.config.ts         # Vite build configuration
```

## Usage Instructions
### Prerequisites
- Java Development Kit (JDK) 21
- Node.js 16.x or later
- Docker and Docker Compose
- PostgreSQL 13 (if running locally without Docker)
- Maven 3.x
- GitHub Secrets Configuration:
  - DOCKER_USERNAME: Your Docker Hub username
  - DOCKER_PROJECT: Your Docker project name
  - DOCKER_PASSWORD: Your Docker Hub password
  - OCP_SERVER: Your OpenShift server URL
  - OCP_TOKEN: Your OpenShift token

### Installation

#### Backend Setup
1. Navigate to the backend directory:
```bash
cd backend/personal-date
```

2. Build the application:
```bash
./mvnw clean package
```

3. Run with Docker Compose:
```bash
docker-compose up -d
```

#### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

### Quick Start
1. Create a new event invitation:
    - Navigate to `/makeyourinvite`
    - Fill in the event details
    - Add potential meeting times

2. Send invitations:
    - Enter recipient email addresses
    - Preview and confirm the invitation
    - Send invitations through the system

3. Track responses:
    - View responses in real-time
    - Monitor selected meeting times
    - Get notifications for new responses

### More Detailed Examples

#### Creating a Custom Invitation
```typescript
// Example of creating an invitation using the API
const createInvite = async (inviteData) => {
  const response = await fetch('/api/invites', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inviteData),
  });
  return response.json();
};
```

#### Managing Responses
```typescript
// Example of updating an invite response
const updateInviteResponse = async (inviteId, meetId) => {
  const response = await fetch(`/api/invites/${inviteId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ meetId }),
  });
  return response.json();
};
```

### Troubleshooting

#### Common Issues

1. Database Connection Issues
```
Error: Unable to connect to PostgreSQL database
```
Solution:
- Verify PostgreSQL is running: `docker ps`
- Check database credentials in `.env` file
- Ensure database port is not in use: `lsof -i :5432`

2. Email Sending Failures
```
Error: MailNotSendException
```
Solution:
- Verify SMTP settings in `application.properties`
- Check email service credentials
- Enable debug logging:
```properties
logging.level.org.springframework.mail=DEBUG
```

#### Debug Mode
Enable debug logging in `application.properties`:
```properties
logging.level.com.team3.personal_date=DEBUG
spring.jpa.show-sql=true
```

## Data Flow
The application follows a clean architecture pattern where requests flow from the frontend through REST controllers to core business logic and finally to the data persistence layer.

```ascii
[Frontend] <-> [REST API] <-> [Use Cases] <-> [Repositories] <-> [Database]
     |            |             |                |
     |            |             |                └── Data persistence
     |            |             └── Business logic
     |            └── API controllers
     └── React components
```

Key Component Interactions:
1. Frontend makes HTTP requests to REST endpoints
2. Controllers validate requests and map to DTOs
3. Use cases implement business logic and validation
4. Repositories handle data persistence
5. Email service sends notifications asynchronously
6. WebSocket provides real-time updates for responses
7. Docker containers ensure consistent environment

### Kubernetes Resources
- **Deployment**: `meet` deployment running the application container
- **Service**: LoadBalancer service exposing port 8080
- **ConfigMap**: Application configuration
- **Secret**: Database and email credentials

### Docker Resources
- PostgreSQL 13 container for data storage
- Application container built with OpenJDK 21
- Docker network for service communication
- Volume for persistent database storage

## Deployment

### Prerequisites
- OpenShift cluster access
- Docker Hub account
- Kubernetes CLI (kubectl)
- OpenShift CLI (oc)

### Deployment Steps
1. Build and push Docker image:
```bash
docker build -t your-registry/personal-date .
docker push your-registry/personal-date
```

2. Deploy to OpenShift:
```bash
oc apply -f k8s/deployment.yaml
oc apply -f k8s/service.yaml
```

3. Verify deployment:
```bash
oc get pods -l app=meet
oc get svc svc-meet
```

## Contributors

- [Diego Brito](https://github.com/Diegobbrito)
- [Igor Moura](https://github.com/igormooura)
- [Felipe Hora](https://github.com/FelipeTorresHora)
- [Ramon Alves](https://github.com/RamonVeirone)
