

import './App.css'
import  Drawer  from "@/components/drawer/page"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { Button } from "@/components/ui/button"



function App() {

  return (
    <>
      
      <h1>YunApplication</h1>
      <Drawer />
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>

              <TabsContent value="account">
                <Card>
                  <CardContent className="space-y-2">
                    
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="password">
                <Card>
                  <CardContent className="space-y-6">
                    </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          
        

    </>
  )
}

export default App
