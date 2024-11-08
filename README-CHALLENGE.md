# Coding Challenge

This file serves as the step by step process for how I went about approaching the Infisical coding challenge.

## One issue setting up

After copying the `.env` file from `.env.example`, my backend was failing to load. There is a required field `ENABLE_MSSQL_SECRET_ROTATION_ENCRYPT` that needs an enum value of `true` or `false`. Simply setting it to `false` fixed the issue. I've comitted this change to `.env.example` to avoid confusion for other users.
