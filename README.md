# MassX Project
![Screenshot from 2024-08-14 16-11-43](https://github.com/user-attachments/assets/7865dbf8-135f-4c3f-a5c8-3bbdc447645e)


This project, named MassX, comprises a frontend built using React and a backend implemented with Flask. It utilizes various technologies and services to ensure efficient deployment and robust security.

## Deployment Plan

The deployment process adheres to the following steps:

1. **Image Creation:** A Docker image is constructed for the application.
2. **Quality Gates:** The code undergoes scrutiny through SonarQube for code quality and security checks.
3. **Security Scanning:** Trivy scans the Docker image for vulnerabilities.
4. **Docker Registry:** The image is pushed to a Docker registry for storage and distribution.
5. **Cloud Deployment:** The image is deployed to an EC2 instance on the cloud.

## Technology Stack

- **Frontend:** React
- **Backend:** Flask
- **Caching:** Redis
- **Database:** Cassandra DB
- **Deployment:** Jenkins, Docker, AWS
- **Security:** SonarQube, Trivy

## Additional Components

- **SMTP Server:** Handles email functionalities.
- **GitHub:** Version control and CI/CD integration.

## Future Enhancements

- Explore integration with additional cloud providers.
- Implement advanced monitoring and logging.
- Consider microservices architecture for scalability.

## Contributing

Feel free to contribute to the project by:

- Submitting bug reports
- Suggesting new features
- Providing code improvements

## Contact

For any inquiries, please contact Aum at [aump6633@gmail.com](mailto:aump6633@gmail.com).
