import { Carousel } from 'react-responsive-carousel';
import AdStatusBadge from './AdStatusBadge';

const PromotedCourseBanner = ({ campaigns }) => {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-lg">
      <Carousel
        showArrows={true}
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={5000}
        transitionTime={800}
      >
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="relative h-96">
            <img 
              src={campaign.image} 
              alt={campaign.title} 
              className="object-cover w-full h-full"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <AdStatusBadge status={campaign.status} />
                  <h3 className="text-2xl font-bold text-white">{campaign.title}</h3>
                  <p className="text-gray-200 line-clamp-2">{campaign.description}</p>
                </div>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  اشترك الآن
                </button>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};
export default PromotedCourseBanner;