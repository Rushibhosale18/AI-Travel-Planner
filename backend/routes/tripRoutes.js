const express = require('express');
const Trip = require('../models/Trip');
const { protect } = require('../middleware/authMiddleware');
const { generateTripPlan } = require('../services/aiService');

const router = express.Router();

// Get all trips for logged in user
router.get('/', protect, async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Create a new trip (Triggers AI Generation)
router.post('/', protect, async (req, res) => {
  const { destination, durationDays, budgetLevel, interests } = req.body;

  try {
    // 1. Ask AI to generate the structured plan
    const aiData = await generateTripPlan(destination, durationDays, budgetLevel, interests);

    // 2. Save it to the database, tied strictly to the user
    const newTrip = await Trip.create({
      userId: req.user.id,
      destination,
      durationDays,
      budgetLevel,
      interests,
      itinerary: aiData.itinerary,
      budgetBreakdown: aiData.budgetBreakdown,
      hotels: aiData.hotels,
      smartPackingList: aiData.smartPackingList
    });

    res.status(201).json(newTrip);
  } catch (error) {
    console.error("Trip Creation Error:", error);
    res.status(500).json({ message: error.message || 'Failed to generate trip' });
  }
});

// Get a specific trip by ID
router.get('/:id', protect, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    
    // Enforce data isolation
    if (!trip || trip.userId.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    
    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update a specific trip (e.g., checking off packing list items)
router.put('/:id', protect, async (req, res) => {
  try {
    let trip = await Trip.findById(req.params.id);
    
    // Enforce data isolation
    if (!trip || trip.userId.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    trip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
