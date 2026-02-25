import HeroSection from "@/app/appcomp/hero";
import { Card, CardContent } from "@/components/ui/card";
import {
  featuresData,
  howItWorksData,
  statsData,
  testimonialsData,
} from "@/data/landing";
export default function Home() {
  return (
    <div className="mt-40 bg-white">
       <HeroSection/>

       
       <section className=" py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {statsData.map((statsData, index)=>(
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-black-600 mb-2" 
                  style={{
                     textShadow: '1px 1px 0 white, -1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white'
                     }}
                  >{statsData.value}</div>
                 <div className="text-3xl mb-2 bg-gradient-to-r 
                from-blue-200/90 via-blue-600/80  to-purple-200/50 
                text-transparent bg-clip-text">
                    {statsData.label}</div>
                </div>
              ))}

          </div>
        </div>
       </section>

       <section className="py-10 pt-0">
        <div className="container mx-auto px-4">
          <h1
  className="text-6xl font-bold text-center mb-12 text-black"
  style={{
    textShadow: '2px 1px 0 white, -1px -1px 0 blue, 2px -1px 0 white, -2px 1px 0 blue'
  }}
>
            Features of this IoT device simulator
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <Card
  key={index}
  className="p-6 bg-gradient-to-br from-blue-900 via-blue-300 to-black 
             backdrop-blur-md rounded-2xl shadow-2xl border border-black/30 
             transform transition-transform duration-500 hover:scale-105 text-brown-300"
>

  <CardContent className="space-y-4 pt-4">
    {feature.icon}
    <h3 className="text-xl font-bold">{feature.title}</h3>
    <p>{feature.description}</p>
  </CardContent>

</Card>
               
          ))}
          </div>
        </div>

       </section>



            

       
  </div>
  );
}
