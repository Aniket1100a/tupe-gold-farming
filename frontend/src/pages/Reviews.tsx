import React, { useEffect, useState } from 'react';
import { apiService } from '../api/services';
import { Review } from '../types';
import { Star, Quote, PlusCircle, MessageSquare } from 'lucide-react';
import { Container, PageHeader, Button } from '../components/common';
import { useLanguage } from '../context/LanguageContext';

export const Reviews: React.FC = () => {
  const { t } = useLanguage();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const res = await apiService.getReviews();
        setReviews(res.data);
      } catch (e) {
        console.error("Failed to fetch reviews", e);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PageHeader
        title="Farmer Testimonials"
        subtitle="Real stories from farmers who have transformed their yield with Tupe Gold Farming."
      />

      <section className="py-20 bg-gray-50 flex-grow">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-8 h-8 text-green-600" />
              <h2 className="text-2xl font-black text-gray-900">What Our Community Says</h2>
            </div>
            <Button to="/add-review" variant="primary" className="shadow-lg">
              <PlusCircle className="w-5 h-5 mr-2" />
              Add Your Review / Feedback
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col relative group">
                  <Quote className="w-10 h-10 text-gold-100 absolute top-6 right-6 group-hover:text-gold-200 transition-colors" />

                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-gold-400 fill-gold-400' : 'text-gray-200'}`} />
                    ))}
                  </div>

                  <p className="text-gray-700 italic leading-relaxed mb-6 flex-grow">
                    "{review.comment}"
                  </p>

                  {review.imageUrl && (
                    <div className="mb-6 rounded-2xl overflow-hidden border border-gray-100 aspect-video">
                      <img src={review.imageUrl} alt="Farmer result" className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{review.name}</h4>
                      <p className="text-xs text-gold-600 font-bold uppercase tracking-wider">{review.farmerType}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && reviews.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
              <p className="text-gray-500 mb-6">No reviews yet. Be the first to share your experience!</p>
              <Button to="/add-review" variant="outline">Share Feedback</Button>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
};
