"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Activity, 
  Users, 
  Zap, 
  Wifi, 
  Thermometer, 
  Lightbulb,
  Settings,
  TrendingUp
} from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Active Devices",
      value: "24",
      icon: <Zap className="h-5 w-5 text-blue-600" />,
      change: "+12%",
      color: "bg-blue-50 border-blue-200"
    },
    {
      title: "Total Projects",
      value: "8",
      icon: <Activity className="h-5 w-5 text-blue-600" />,
      change: "+3",
      color: "bg-blue-50 border-blue-200"
    },
    {
      title: "Online Sensors",
      value: "156",
      icon: <Wifi className="h-5 w-5 text-blue-600" />,
      change: "+8%",
      color: "bg-blue-50 border-blue-200"
    },
    {
      title: "Active Users",
      value: "42",
      icon: <Users className="h-5 w-5 text-blue-600" />,
      change: "+5",
      color: "bg-blue-50 border-blue-200"
    }
  ];

  const recentProjects = [
    {
      name: "Smart Home System",
      status: "active",
      devices: 12,
      lastUpdate: "2 hours ago"
    },
    {
      name: "Industrial Monitoring",
      status: "warning",
      devices: 8,
      lastUpdate: "5 minutes ago"
    },
    {
      name: "Weather Station",
      status: "active",
      devices: 6,
      lastUpdate: "1 hour ago"
    }
  ];

  const deviceStatus = [
    { name: "Temperature Sensor", value: 24.5, unit: "°C", status: "online" },
    { name: "Humidity Sensor", value: 65, unit: "%", status: "online" },
    { name: "Light Sensor", value: 850, unit: "lux", status: "offline" },
    { name: "Motion Detector", value: 0, unit: "m/s", status: "online" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-3xl font-bold text-blue-900">IoT Dashboard</h1>
              <p className="text-blue-600 mt-1">Monitor and control your devices</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Add Device
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className={`${stat.color} border-2`}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-blue-900">
                  {stat.title}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-900">{stat.value}</div>
                <p className="text-xs text-blue-600 mt-1">{stat.change} from last week</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Recent Projects */}
          <div className="lg:col-span-2">
            <Card className="bg-white border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900">Recent Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentProjects.map((project, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-blue-900">{project.name}</h4>
                        <p className="text-sm text-blue-600">{project.devices} devices</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge 
                          variant={project.status === "active" ? "default" : "secondary"}
                          className={project.status === "active" ? "bg-blue-600" : "bg-orange-500"}
                        >
                          {project.status}
                        </Badge>
                        <span className="text-sm text-blue-600">{project.lastUpdate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Device Status */}
          <div>
            <Card className="bg-white border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900">Device Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deviceStatus.map((device, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${device.status === "online" ? "bg-green-500" : "bg-red-500"}`} />
                        <span className="text-sm font-medium text-blue-900">{device.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-blue-900">{device.value}{device.unit}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          
          {/* System Health */}
          <Card className="bg-white border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">System Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-blue-900">CPU Usage</span>
                    <span className="text-sm text-blue-600">45%</span>
                  </div>
                  <Progress value={45} className="h-2 bg-blue-100" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-blue-900">Memory</span>
                    <span className="text-sm text-blue-600">72%</span>
                  </div>
                  <Progress value={72} className="h-2 bg-blue-100" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-blue-900">Network</span>
                    <span className="text-sm text-blue-600">89%</span>
                  </div>
                  <Progress value={89} className="h-2 bg-blue-100" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-white border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                  <Thermometer className="h-4 w-4 mr-2" />
                  Temperature
                </Button>
                <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Lighting
                </Button>
                <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                  <Activity className="h-4 w-4 mr-2" />
                  Monitor
                </Button>
                <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
