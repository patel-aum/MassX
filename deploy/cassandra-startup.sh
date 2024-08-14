#!/bin/bash
set -e

echo "Running Cassandra setup..."

# Start Cassandra in the background
#/usr/bin/cassandra -f &

# Wait for Cassandra to start
sleep 30

# Run setup commands
cqlsh <<EOF
CREATE KEYSPACE IF NOT EXISTS email_sender WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};
USE email_sender;

CREATE TABLE IF NOT EXISTS templates (
    id UUID PRIMARY KEY,
    name TEXT,
    subject TEXT,
    body TEXT
);

CREATE TABLE IF NOT EXISTS recipients (
    id UUID PRIMARY KEY,
    email TEXT,
    name TEXT
);

CREATE TABLE IF NOT EXISTS email_logs (
    id UUID PRIMARY KEY,
    recipient_email TEXT,
    subject TEXT,
    body TEXT,
    status TEXT,
    timestamp TIMESTAMP
);
EOF

