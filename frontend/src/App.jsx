import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, Sparkles, Calendar, Search, ShoppingBag, 
  Check, X, ChevronRight, Loader2, Camera, Wand2,
  Star, TrendingUp, Users, Zap, ShoppingCart
} from 'lucide-react';

// ============================================================================
// PRODUCT MODAL COMPONENT
// ============================================================================
const ProductModal = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass rounded-2xl p-6 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Product Image */}
        <div className="relative mb-4">
          <img
            src={product.image_path}
            alt={product.name || product.productDisplayName}
            className="w-full h-64 object-contain rounded-xl bg-white"
            onError={(e) => e.target.src = 'https://via.placeholder.com/300?text=No+Image'}
          />
        </div>

        {/* Product Details */}
        <div className="space-y-3 mb-6">
          <h3 className="font-display text-xl font-semibold">
            {product.name || product.productDisplayName}
          </h3>
          <p className="text-gray-400">{product.category || product.articleType}</p>
          
          {product.similarity && (
            <div className="flex items-center gap-2">
              <span className="tag tag-primary">
                {Math.round(product.similarity * 100)}% match
              </span>
            </div>
          )}
          
          {product.match_confidence && (
            <div className="flex items-center gap-2">
              <span className="tag tag-success">
                <Check className="w-3 h-3 mr-1" />
                {product.match_confidence}% confident
              </span>
            </div>
          )}

          {product.recommended_as && (
            <p className="text-sm text-[#e94560]">
              Recommended as: {product.recommended_as}
            </p>
          )}

          {product.match_reason && (
            <p className="text-sm text-gray-400 italic">"{product.match_reason}"</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onAddToCart}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#e94560] to-[#f5a623] font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ============================================================================
// ADDED TO CART NOTIFICATION
// ============================================================================
const AddedToCartNotification = ({ show }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="fixed top-20 left-1/2 -translate-x-1/2 z-50 glass rounded-xl px-6 py-4 flex items-center gap-3"
      >
        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
          <Check className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="font-semibold">Product added to your cart!</p>
          <p className="text-sm text-gray-400">Continue shopping or checkout</p>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

// ============================================================================
// HEADER COMPONENT
// ============================================================================
const Header = ({ activeTab, setActiveTab, cartCount }) => (
  <header className="fixed top-0 left-0 right-0 z-50 glass-dark">
    <div className="max-w-7xl mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e94560] to-[#f5a623] flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-display text-xl font-semibold">StyleFit</h1>
            <p className="text-xs text-gray-400">AI Outfit Assistant</p>
          </div>
        </div>
        
        <nav className="flex items-center gap-1 bg-white/5 rounded-full p-1">
          {[
            { id: 'match', label: 'Style Matcher', icon: Camera },
            { id: 'event', label: 'Event Stylist', icon: Calendar },
            { id: 'search', label: 'Smart Search', icon: Search },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === id 
                  ? 'bg-[#e94560] text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <span className="tag tag-success">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
            AI Online
          </span>
          
          {/* Cart Counter */}
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition cursor-pointer">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            {cartCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#e94560] flex items-center justify-center text-xs font-bold"
              >
                {cartCount}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  </header>
);

// ============================================================================
// STYLE MATCHER (Image Upload & Analysis)
// ============================================================================
const StyleMatcher = ({ onAddToCart }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [matchingItems, setMatchingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer?.files?.[0] || e.target?.files?.[0];
    if (file && file.type.startsWith('image/')) {
      processImage(file);
    }
  }, []);

  const processImage = async (file) => {
    setIsLoading(true);
    
    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => setUploadedImage(e.target.result);
    reader.readAsDataURL(file);

    // Send to API
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      setAnalysis(data.analysis);
      setMatchingItems(data.matching_items || []);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetUpload = () => {
    setUploadedImage(null);
    setAnalysis(null);
    setMatchingItems([]);
  };

  const handleProductClick = (item) => {
    setSelectedProduct(item);
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      onAddToCart(selectedProduct);
    }
    setSelectedProduct(null);
    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Added to Cart Notification */}
      <AddedToCartNotification show={showAddedMessage} />

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
          />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h2 className="font-display text-4xl md:text-5xl font-bold">
          Find Your <span className="gradient-text">Perfect Match</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Upload any clothing item and our AI will analyze its style, color, and type 
          to find complementary pieces from our inventory.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="glass rounded-2xl p-6 h-full">
            <div className="flex items-center gap-2 mb-4">
              <Camera className="w-5 h-5 text-[#e94560]" />
              <h3 className="font-semibold">Upload Your Item</h3>
            </div>

            {!uploadedImage ? (
              <div
                className={`dropzone rounded-xl p-12 text-center cursor-pointer transition-all ${dragActive ? 'active' : ''}`}
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-input').click()}
              >
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleDrop}
                />
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Upload className="w-12 h-12 mx-auto mb-4 text-[#e94560]" />
                </motion.div>
                <p className="text-lg font-medium mb-2">Drag & drop your image here</p>
                <p className="text-sm text-gray-400">or click to browse</p>
                <p className="text-xs text-gray-500 mt-4">Supports: JPG, PNG, WebP</p>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={uploadedImage}
                  alt="Uploaded"
                  className="w-full h-80 object-contain rounded-xl bg-black/20"
                />
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-xl">
                    <div className="text-center">
                      <Loader2 className="w-10 h-10 animate-spin mx-auto mb-3 text-[#e94560]" />
                      <p className="text-sm">Analyzing with Databricks AI...</p>
                    </div>
                  </div>
                )}
                <button
                  onClick={resetUpload}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black/80 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Analysis Results */}
            {analysis && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 space-y-4"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#f5a623]" />
                  <h4 className="font-semibold">AI Analysis</h4>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  <div className="glass rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-400 mb-1">Category</p>
                    <p className="font-medium text-[#e94560]">{analysis.category}</p>
                  </div>
                  <div className="glass rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-400 mb-1">Gender</p>
                    <p className="font-medium text-[#f5a623]">{analysis.gender}</p>
                  </div>
                  <div className="glass rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-400 mb-1">Matches</p>
                    <p className="font-medium text-green-400">{matchingItems.length}</p>
                  </div>
                </div>

                {analysis.description && (
                  <p className="text-sm text-gray-400 italic">"{analysis.description}"</p>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="glass rounded-2xl p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Wand2 className="w-5 h-5 text-[#f5a623]" />
                <h3 className="font-semibold">Matching Items</h3>
              </div>
              {matchingItems.length > 0 && (
                <span className="tag tag-gold">{matchingItems.length} found</span>
              )}
            </div>

            {matchingItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-80 text-center">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-gray-500" />
                </div>
                <p className="text-gray-400">Upload an image to see matching items</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {matchingItems.map((item, index) => (
                  <motion.div
                    key={item.id || index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass rounded-xl p-4 card-hover cursor-pointer"
                    onClick={() => handleProductClick(item)}
                  >
                    <div className="flex gap-4">
                      <img
                        src={item.image_path}
                        alt={item.productDisplayName}
                        className="w-20 h-20 object-cover rounded-lg bg-white hover:scale-105 transition-transform"
                        onError={(e) => e.target.src = 'https://via.placeholder.com/80?text=No+Image'}
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.productDisplayName}</h4>
                        <p className="text-xs text-gray-400 mt-1">{item.articleType}</p>
                        
                        <div className="flex items-center gap-2 mt-2">
                          {item.match_verified ? (
                            <span className="tag tag-success text-xs">
                              <Check className="w-3 h-3 mr-1" /> Verified Match
                            </span>
                          ) : (
                            <span className="tag tag-primary text-xs">Suggested</span>
                          )}
                          {item.match_confidence && (
                            <span className="text-xs text-gray-500">
                              {item.match_confidence}% confident
                            </span>
                          )}
                        </div>
                        
                        {item.match_reason && (
                          <p className="text-xs text-gray-400 mt-2 line-clamp-2">
                            {item.match_reason}
                          </p>
                        )}
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 self-center" />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// ============================================================================
// EVENT STYLIST (New AI Feature)
// ============================================================================
const EventStylist = ({ onAddToCart }) => {
  const [eventType, setEventType] = useState('');
  const [gender, setGender] = useState('Women');
  const [stylePrefs, setStylePrefs] = useState('');
  const [recommendations, setRecommendations] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  const eventSuggestions = [
    { emoji: '💒', label: 'Wedding Reception' },
    { emoji: '🎉', label: 'Birthday Party' },
    { emoji: '💼', label: 'Job Interview' },
    { emoji: '🍷', label: 'Date Night' },
    { emoji: '🏖️', label: 'Beach Vacation' },
    { emoji: '🎄', label: 'Holiday Dinner' },
    { emoji: '🏢', label: 'Business Meeting' },
    { emoji: '🎭', label: 'Theater Night' },
  ];

  const getRecommendations = async () => {
    if (!eventType) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/event-outfit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: eventType,
          gender: gender,
          style_preferences: stylePrefs
        })
      });
      const data = await response.json();
      setRecommendations(data);
    } catch (error) {
      console.error('Failed to get recommendations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProductClick = (item) => {
    setSelectedProduct(item);
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      onAddToCart(selectedProduct);
    }
    setSelectedProduct(null);
    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Added to Cart Notification */}
      <AddedToCartNotification show={showAddedMessage} />

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
          />
        )}
      </AnimatePresence>

      {/* Hero */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="inline-flex items-center gap-2 tag tag-gold mb-2">
          <Zap className="w-4 h-4" />
          NEW AI FEATURE
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-bold">
          Dress for <span className="gradient-text">Any Occasion</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Tell us about your upcoming event and our AI stylist will create a complete 
          outfit recommendation with items from our inventory.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="glass rounded-2xl p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#e94560]" />
              What's the Occasion?
            </h3>

            {/* Event Quick Select */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              {eventSuggestions.map(({ emoji, label }) => (
                <button
                  key={label}
                  onClick={() => setEventType(label)}
                  className={`p-3 rounded-xl text-left transition-all ${
                    eventType === label 
                      ? 'bg-[#e94560] text-white' 
                      : 'glass hover:bg-white/10'
                  }`}
                >
                  <span className="text-xl mr-2">{emoji}</span>
                  <span className="text-sm">{label}</span>
                </button>
              ))}
            </div>

            {/* Custom Event Input */}
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 block mb-2">Or describe your event</label>
                <input
                  type="text"
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  placeholder="e.g., Casual Friday at tech startup"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#e94560] outline-none transition"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-2">Gender</label>
                <div className="flex gap-2">
                  {['Women', 'Men', 'Unisex'].map((g) => (
                    <button
                      key={g}
                      onClick={() => setGender(g)}
                      className={`flex-1 py-2 rounded-lg transition ${
                        gender === g 
                          ? 'bg-[#e94560] text-white' 
                          : 'glass hover:bg-white/10'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-2">Style Preferences (optional)</label>
                <input
                  type="text"
                  value={stylePrefs}
                  onChange={(e) => setStylePrefs(e.target.value)}
                  placeholder="e.g., minimalist, bold colors, comfortable"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#e94560] outline-none transition"
                />
              </div>

              <button
                onClick={getRecommendations}
                disabled={!eventType || isLoading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#e94560] to-[#f5a623] font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating Your Look...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Get AI Recommendations
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="glass rounded-2xl p-6 h-full">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-[#f5a623]" />
              Your Curated Outfit
            </h3>

            {!recommendations ? (
              <div className="flex flex-col items-center justify-center h-80 text-center">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                  <Wand2 className="w-8 h-8 text-gray-500" />
                </div>
                <p className="text-gray-400">Select an event to get outfit recommendations</p>
              </div>
            ) : (
              <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
                {/* Formality & Colors */}
                <div className="flex gap-3">
                  {recommendations.formality_level && (
                    <span className="tag tag-primary">{recommendations.formality_level}</span>
                  )}
                  {recommendations.color_palette && (
                    <span className="tag tag-gold">{recommendations.color_palette}</span>
                  )}
                </div>

                {/* Style Tips */}
                {recommendations.style_tips && (
                  <div className="glass rounded-xl p-4">
                    <h4 className="text-sm font-medium mb-2 text-[#f5a623]">💡 Style Tips</h4>
                    <ul className="space-y-1">
                      {recommendations.style_tips.map((tip, i) => (
                        <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 mt-0.5 text-[#e94560]" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Matched Inventory Items */}
                {recommendations.matched_inventory?.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-3 text-gray-400">Available in Store - Click to Select</h4>
                    <div className="grid gap-3">
                      {recommendations.matched_inventory.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="glass rounded-xl p-3 card-hover cursor-pointer"
                          onClick={() => handleProductClick(item)}
                        >
                          <div className="flex gap-3">
                            <img
                              src={item.image_path}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-lg bg-white hover:scale-105 transition-transform"
                              onError={(e) => e.target.src = 'https://via.placeholder.com/64?text=No+Image'}
                            />
                            <div className="flex-1">
                              <p className="font-medium text-sm">{item.name}</p>
                              <p className="text-xs text-gray-400">{item.category}</p>
                              <p className="text-xs text-[#e94560] mt-1">
                                Recommended as: {item.recommended_as}
                              </p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400 self-center" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// ============================================================================
// SMART SEARCH
// ============================================================================
const SmartSearch = ({ onAddToCart }) => {
  const [query, setQuery] = useState('');
  const [gender, setGender] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  const searchSuggestions = [
    "Casual blue jeans for weekend",
    "Formal white shirt for meetings",
    "Sporty sneakers for gym",
    "Elegant dress for evening",
    "Comfortable cotton t-shirt",
  ];

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, gender: gender || undefined })
      });
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProductClick = (item) => {
    setSelectedProduct(item);
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      onAddToCart(selectedProduct);
    }
    setSelectedProduct(null);
    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Added to Cart Notification */}
      <AddedToCartNotification show={showAddedMessage} />

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
          />
        )}
      </AnimatePresence>

      {/* Hero */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h2 className="font-display text-4xl md:text-5xl font-bold">
          Search with <span className="gradient-text">Natural Language</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Describe what you're looking for in your own words. Our AI understands 
          style, color, occasion, and more.
        </p>
      </motion.div>

      {/* Search Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="max-w-3xl mx-auto"
      >
        <div className="glass rounded-2xl p-6">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Describe what you're looking for..."
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-[#e94560] outline-none transition text-lg"
              />
            </div>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="px-4 py-4 rounded-xl bg-white/5 border border-white/10 outline-none"
            >
              <option value="">All</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
            </select>
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#e94560] to-[#f5a623] font-semibold flex items-center gap-2 hover:opacity-90 transition disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
              Search
            </button>
          </div>

          {/* Suggestions */}
          <div className="flex flex-wrap gap-2 mt-4">
            {searchSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => { setQuery(suggestion); }}
                className="text-sm px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 transition text-gray-400 hover:text-white"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Results Grid */}
      {results.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {results.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass rounded-xl overflow-hidden card-hover cursor-pointer"
              onClick={() => handleProductClick(item)}
            >
              <img
                src={item.image_path}
                alt={item.name}
                className="w-full h-40 object-cover bg-white hover:scale-105 transition-transform"
                onError={(e) => e.target.src = 'https://via.placeholder.com/160?text=No+Image'}
              />
              <div className="p-3">
                <h4 className="font-medium text-sm truncate">{item.name}</h4>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-400">{item.category}</span>
                  <span className="text-xs text-[#e94560]">
                    {Math.round(item.similarity * 100)}% match
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

// ============================================================================
// STATS BANNER
// ============================================================================
const StatsBanner = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
  >
    {[
      { icon: ShoppingBag, value: '1,000+', label: 'Items in Inventory', color: 'text-[#e94560]' },
      { icon: Sparkles, value: 'Databricks', label: 'AI Platform', color: 'text-[#f5a623]' },
      { icon: TrendingUp, value: '94%', label: 'Match Accuracy', color: 'text-green-400' },
      { icon: Users, value: '< 3s', label: 'Response Time', color: 'text-blue-400' },
    ].map(({ icon: Icon, value, label, color }) => (
      <div key={label} className="glass rounded-xl p-4 text-center">
        <Icon className={`w-6 h-6 mx-auto mb-2 ${color}`} />
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-xs text-gray-400">{label}</p>
      </div>
    ))}
  </motion.div>
);

// ============================================================================
// MAIN APP
// ============================================================================
function App() {
  const [activeTab, setActiveTab] = useState('match');
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(prevCart => [...prevCart, product]);
  };

  return (
    <div className="min-h-screen animated-gradient">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} cartCount={cart.length} />
      
      <main className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <StatsBanner />
          
          <AnimatePresence mode="wait">
            {activeTab === 'match' && (
              <motion.div
                key="match"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <StyleMatcher onAddToCart={addToCart} />
              </motion.div>
            )}
            {activeTab === 'event' && (
              <motion.div
                key="event"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <EventStylist onAddToCart={addToCart} />
              </motion.div>
            )}
            {activeTab === 'search' && (
              <motion.div
                key="search"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <SmartSearch onAddToCart={addToCart} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="glass-dark py-6 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400 text-sm">
            Powered by <span className="text-[#e94560]">Databricks</span>
          </p>
          <p className="text-gray-500 text-xs mt-2">
            StyleFit AI Outfit Assistant Demo • Built for Innovation
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
