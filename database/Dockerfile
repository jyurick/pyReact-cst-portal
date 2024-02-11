# Use the official PostgreSQL image from Docker Hub
FROM postgres:latest

# Set environment variables (optional)
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=password
ENV POSTGRES_DB=cstportal

# Copy initialization scripts (if any) to the Docker container
COPY init.sql /docker-entrypoint-initdb.d/

# Expose the PostgreSQL port
EXPOSE 5432