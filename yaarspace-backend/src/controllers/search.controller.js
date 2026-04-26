import express from "express";
import supabaseAdmin from '../db/supabaseClient.js'

const router = express.Router();

export const searchPeople = async (req, res) => {
  try {
    const { q, page = 1 } = req.query;

    if (!q) {
      return res.status(400).json({ message: "Query is required" });
    }

    // 1. Parse multiple skills
    const searchSkills = q
      .toLowerCase()
      .split(",")
      .map(skill => skill.trim());
    // 2. Get current user (from auth middleware ideally)
    const currentUserId = req.user.id;

    const { data: currentUser } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .eq("id", currentUserId)
      .single();

      
      // 3. Fetch potential matches (limit raw fetch)
      const { data: users, error } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .limit(200); // important for performance
      
    if (error) throw error;

    // 4. Score function
    const calculateScore = (user) => {
      let score = 0;

      if (user.id === currentUserId) return -1;

      // 1. Skill match
      const matchedSkills = user.tech_stack?.filter(skill =>
        searchSkills.includes(skill.toLowerCase())
      ).length;


      score += matchedSkills * 30;

      // 2. Profile completeness
      if (user.about_me) score += 5;
      if (user.avatar_url) score += 5;
      if (user.interests?.length > 2) score += 5;

      // 3. Activity
      const days =
        (Date.now() - new Date(user.updated_at)) /
        (1000 * 60 * 60 * 24);
      
        
        if (days < 1) score += 25;
        else if (days < 7) score += 15;
        else score += 5;
        
        // 4. Similarity with current user
        const overlap = user.tech_stack?.filter(skill =>
          currentUser.tech_stack?.includes(skill)
        ).length;
        
      score += overlap * 5;

      // 5. Popularity
      score += Math.min(user.connections_count || 0, 10);

      return score;
    };

    // 5. Rank users
    const rankedUsers = users
      .map(user => ({
        ...user,
        score: calculateScore(user),
      }))
      .filter(user => user.score > 0)
      .sort((a, b) => b.score - a.score);


    // 6. Pagination
    const limit = 20;
    const start = (page - 1) * limit;
    const end = page * limit;

    const result = rankedUsers.slice(start, end);

    // 7. Send response
    res.json({
      users: result,
      total: rankedUsers.length,
      page: Number(page),
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};