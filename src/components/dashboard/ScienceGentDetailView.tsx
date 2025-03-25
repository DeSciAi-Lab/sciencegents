
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Star } from "lucide-react";
import { DashboardScienceGent } from '@/hooks/useUserDashboard';

interface ScienceGentDetailViewProps {
  scienceGent: DashboardScienceGent;
  onBack: () => void;
}

const ScienceGentDetailView: React.FC<ScienceGentDetailViewProps> = ({ 
  scienceGent, 
  onBack 
}) => {
  const renderRating = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i} 
          size={20} 
          className={i <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} 
        />
      );
    }
    return <div className="flex">{stars}</div>;
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onBack}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <CardTitle>ScienceGent Details</CardTitle>
        </div>
        <CardDescription>Manage your ScienceGent token and AI agent</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
              {scienceGent.name.charAt(0)}
            </div>
          </div>
          
          <div className="flex-grow">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-2xl font-bold">{scienceGent.name}</h2>
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                ${scienceGent.symbol}
              </Badge>
            </div>
            
            <div className="flex items-center gap-3 text-sm mb-4">
              <Badge variant="outline" className="bg-gray-50 font-normal">
                {scienceGent.address.substring(0, 6)}...{scienceGent.address.slice(-6)}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-sm text-muted-foreground">Users</div>
                <div className="text-xl font-semibold">1273</div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-sm text-muted-foreground">Interactions</div>
                <div className="text-xl font-semibold">1273</div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-sm text-muted-foreground">Revenue</div>
                <div className="text-xl font-semibold">1273</div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-sm text-muted-foreground">Holders</div>
                <div className="text-xl font-semibold">265</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">Maturity Status</h3>
            <div className="mb-3">
              <div className="w-full bg-gray-200 h-2.5 rounded-full mb-2">
                <div 
                  className="bg-blue-500 h-2.5 rounded-full" 
                  style={{ width: '75%' }}
                ></div>
              </div>
              <div className="text-sm text-gray-500">75%</div>
            </div>
            <p className="text-sm text-gray-600">
              Migration condition: trading fee &gt;= 2× virtualETH + capability fees
            </p>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">5 Capabilities:</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Chat</Badge>
              <Badge variant="secondary">Molecular Vision</Badge>
              <Badge variant="secondary">LLAMPS</Badge>
              <Badge variant="secondary">Bose-Einstein Simulation</Badge>
              <Badge variant="secondary">more</Badge>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-6 mt-6">
          <h2 className="text-xl font-semibold mb-6">Update</h2>
          
          <div className="space-y-6">
            <div>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-medium">1.</span>
                <span>Update Agent Fee per interaction (in DSI)</span>
              </div>
              <div className="flex items-center gap-2 ml-6">
                <Input placeholder="e.g. 3" className="max-w-xs" />
                <Button>Update</Button>
              </div>
            </div>
            
            <div>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-medium">2.</span>
                <span>Update Persona</span>
              </div>
              <div className="flex items-center gap-2 ml-6">
                <Input placeholder="new custom instructions to set Persona" className="max-w-xs" />
                <Button>Update</Button>
              </div>
            </div>
            
            <div>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-medium">3.</span>
                <span>Add and Remove a capability from ScienceGent</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 ml-6">
                <div className="flex items-center gap-2">
                  <Input placeholder="capability ID" className="max-w-xs" />
                  <Button className="bg-blue-500 hover:bg-blue-600">Add</Button>
                </div>
                <div className="flex items-center gap-2">
                  <Input placeholder="capability ID" className="max-w-xs" />
                  <Button variant="destructive">Remove</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScienceGentDetailView;
