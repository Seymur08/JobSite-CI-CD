FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /app-service

ENV DOTNET_CLI_TELEMETRY_OPTOUT=1
ENV DOTNET_SKIP_FIRST_TIME_EXPERIENCE=true

COPY *.csproj ./

RUN dotnet restore

COPY . .

RUN dotnet publish -c Release -o out

# Runtime üçün yüngül ASP.NET Core runtime imicindən istifadə
FROM mcr.microsoft.com/dotnet/aspnet:8.0

WORKDIR /app-service

COPY --from=build /app-service/out .

ENTRYPOINT ["dotnet", "Job_Site.dll"]













# FROM  mcr.microsoft.com/dotnet/sdk:8.0 As build

# WORKDIR /app-service

# COPY *.csproj .

# RUN dotnet restore

# COPY . . 

# RUN dotnet publish -c Release -o out

# FROM  mcr.microsoft.com/dotnet/sdk:8.0

# WORKDIR /app-service

# COPY --from=build /app-service/out .

# ENTRYPOINT ["dotnet", "Job_Site.dll" ]


