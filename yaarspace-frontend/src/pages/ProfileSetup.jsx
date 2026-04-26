import React, { useState, useContext, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch"; // Import Switch for Availability
import { Label } from "@/components/ui/label";
import { X, Upload, MapPin, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthProvider";
import { supabase } from "@/services/supabaseClient";

const ProfileSetup = () => {
  const { user, setUserProfilePicture } = useAuth(); // user name from your AuthContext
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(
    user?.user_metadata?.avatar_url || "",
  );
  const [file, setFile] = useState(null); // 1. Create a state for the file
  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setPreviewUrl(URL.createObjectURL(event.target.files[0]));
      setFile(event.target.files[0]);
    }
  };

  const [formData, setFormData] = useState({
    full_name: user?.user_metadata?.full_name || "", // Defaulting to AuthContext name
    college_name: "",
    year_of_study: "",
    branch: "",
    location: "",
    linkedin_url: "",
    portfolio_url: "",
    github_username: "",
    coding_handle: "", // Added URL field
    about_me: "",
    availability: true, // Default to Looking to work
  });

  const [interests, setInterests] = useState([]);
  const [techStack, setTechStack] = useState([]);
  const [preferredRoles, setPreferredRoles] = useState([]);
  const [lookingFor, setLookingFor] = useState([]); // Now an array

  // --- LOGIC HANDLERS ---

  const handleKeyDown = (e, list, setList) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      e.preventDefault();
      const val = e.target.value.trim();
      if (!list.includes(val)) {
        setList((prev) => [...prev, val]); // Use functional update for stability
      }
      e.target.value = "";
    }
  };

  const removeTag = (tagToRemove, setList) => {
    setList((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const uploadAvatar = async () => {
    if (!file) {
      return previewUrl;
    }
    const fileExt = file.name.split(".").pop();
    const filePath = `${user.id}/avatar.${fileExt}`;
    
    const { error } = await supabase.storage
    .from("avatars")
    .upload(filePath, file, {
      upsert: true,
    });
    
    if (error) {
      console.error(error);
      return null;
    }
    
    const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const avatarUrl = await uploadAvatar(file, user);

    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      ...formData,
      interests,
      tech_stack: techStack,
      preferred_roles: preferredRoles,
      looking_for: lookingFor,
      avatar_url: avatarUrl,
    });

    setUserProfilePicture(avatarUrl);

    if (error) toast.error(error.message);
    else toast.success("Profile saved successfully!");
    setLoading(false);
  };

  const fetchProfile = async (user) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error(error);
      return;
    }

    return data;
  };

  useEffect(() => {
    if (!user) return;

    const loadProfile = async () => {
      const data = await fetchProfile(user);

      if (data) {
        setFormData({
          full_name: data.full_name || "",
          college_name: data.college_name || "",
          year_of_study: data.year_of_study || "",
          branch: data.branch || "",
          location: data.location || "",
          linkedin_url: data.linkedin_url || "",
          portfolio_url: data.portfolio_url || "",
          github_username: data.github_username || "",
          coding_handle: data.coding_handle || "",
          about_me: data.about_me || "",
          availability: data.availability ?? true,
        });

          setInterests(data.interests || []);
          setTechStack(data.tech_stack || []);
          setPreferredRoles(data.preferred_roles || []);
          setLookingFor(data.looking_for || []);
          setPreviewUrl(data.avatar_url || "");
          setUserProfilePicture(data.avatar_url || "https://n2r5uux6k5.ucarecd.net/436cd9c5-c41d-4555-b415-3fb8b7daefff/-/preview/512x512/")

      }
    };

    loadProfile();
  }, [user]);

  return (
    <div className="min-h-screen bg-[#FDFCF0] py-12 px-6 font-sans">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black text-[#064E3B] uppercase italic tracking-tighter">
              Your Builder Profile
            </h1>
            <p className="text-[#475569] mt-2 italic font-medium">
              Draft your presence on YaarSpace
            </p>
          </div>

          {/* Availability Toggle */}
          <div className="flex items-center space-x-3 bg-[#FDFCF0] p-4 rounded-2xl border border-[#064E3B]/10">
            <Label htmlFor="availability" className="font-bold text-[#064E3B]">
              {formData.availability
                ? "🟢 Looking to Work"
                : "🔴 Busy / Not Seeking"}
            </Label>
            <Switch
              id="availability"
              checked={formData.availability}
              onCheckedChange={(val) =>
                setFormData({ ...formData, availability: val })
              }
            />
          </div>
        </div>

        <form onSubmit={handleUpdateProfile} className="space-y-10">
          <div className="grid md:grid-cols-3 gap-10">
            {/* Left Column: Media & Status */}
            <div className="space-y-6">
              <div className="flex flex-col items-center gap-4 bg-[#FDFCF0] p-8 rounded-3xl border-2 border-dashed border-[#064E3B]/20">
                <div className="relative group">
                  <img
                    src={
                      previewUrl ||
                      "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                    }
                    className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
                    alt="Profile"
                  />
                  <label className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                    <Upload className="text-white" />
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                <p className="text-xs font-bold uppercase text-[#064E3B]">
                  Upload Avatar
                </p>
              </div>

              <div className="space-y-4">
                <Label className="uppercase text-xs font-black tracking-widest">
                  Location
                </Label>
                <div className="relative">
                  <MapPin
                    className="absolute left-3 top-3 text-[#064E3B]"
                    size={18}
                  />
                  <Input
                    className="pl-10"
                    placeholder="e.g. Mumbai, India"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Middle & Right Column: Fields */}
            <div className="md:col-span-2 grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <Label className="uppercase text-xs font-black tracking-widest">
                  Full Name
                </Label>
                <Input
                  value={formData.full_name}
                  onChange={(e) =>
                    setFormData({ ...formData, full_name: e.target.value })
                  }
                />

                <Label className="uppercase text-xs font-black tracking-widest">
                  College Name
                </Label>
                <Input
                  value={formData.college_name}
                  onChange={(e) =>
                    setFormData({ ...formData, college_name: e.target.value })
                  }
                />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="uppercase text-xs font-black tracking-widest">
                      Branch
                    </Label>
                    <Input
                      placeholder="CSE"
                      value={formData.branch}
                      onChange={(e) =>
                        setFormData({ ...formData, branch: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label className="uppercase text-xs font-black tracking-widest">
                      Year
                    </Label>
                    <Input
                      placeholder="3rd Year"
                      value={formData.year_of_study}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          year_of_study: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="uppercase text-xs font-black tracking-widest">
                  Coding Handle (e.g. LeetCode)
                </Label>
                <div className="relative">
                  <LinkIcon
                    className="absolute left-3 top-3 text-[#475569]"
                    size={18}
                  />
                  <Input
                    className="pl-10"
                    placeholder="https://leetcode.com/u/..."
                    value={formData.coding_handle}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        coding_handle: e.target.value,
                      })
                    }
                  />
                </div>

                <Label className="uppercase text-xs font-black tracking-widest">
                  Linkedin Profile
                </Label>
                <div className="relative">
                  <LinkIcon
                    className="absolute left-3 top-3 text-[#475569]"
                    size={18}
                  />
                  <Input
                    className="pl-10"
                    placeholder="https://www.linkedin.com/in/..."
                    value={formData.linkedin_url}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        linkedin_url: e.target.value,
                      })
                    }
                  />
                </div>

                <Label className="uppercase text-xs font-black tracking-widest">
                  Github
                </Label>
                <div className="relative">
                  <LinkIcon
                    className="absolute left-3 top-3 text-[#475569]"
                    size={18}
                  />
                  <Input
                    className="pl-10"
                    placeholder="https://github.com/..."
                    value={formData.github_username}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        github_username: e.target.value,
                      })
                    }
                  />
                </div>

                <Label className="uppercase text-xs font-black tracking-widest">
                  Portfolio URL
                </Label>
                <div className="relative">
                  <LinkIcon
                    className="absolute left-3 top-3 text-[#475569]"
                    size={18}
                  />
                  <Input
                    className="pl-10"
                    placeholder="https://my-portfolio.com"
                    value={formData.portfolio_url}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        portfolio_url: e.target.value,
                      })
                    }
                  />
                </div>

                {/* <Label className="uppercase text-xs font-black tracking-widest">GitHub Username</Label>
                <div className="relative">
                  {/* <Github className="absolute left-3 top-3 text-[#475569]" size={18} /> */}
                {/* <Input className="pl-10" placeholder="username" value={formData.github_username} onChange={e => setFormData({...formData, github_username: e.target.value})} /> */}
                {/* </div>  */}

                {/* <Label className="uppercase text-xs font-black tracking-widest">Portfolio URL</Label> */}
              </div>
            </div>
          </div>

          <hr className="border-[#064E3B]/10" />

          {/* Dynamic Tags Section */}
          <div className="grid md:grid-cols-2 gap-8">
            <TagInput
              label="Tech Stack"
              tags={techStack}
              placeholder="Type React, Node.. and hit Enter"
              onAdd={(e) => handleKeyDown(e, techStack, setTechStack)}
              onRemove={(tag) => removeTag(tag, setTechStack)}
            />
            <TagInput
              label="Interests"
              tags={interests}
              placeholder="e.g. DevOps, Backend, ML, UI/UX"
              onAdd={(e) => handleKeyDown(e, interests, setInterests)}
              onRemove={(tag) => removeTag(tag, setInterests)}
            />
            <TagInput
              label="Looking For"
              tags={lookingFor}
              placeholder="e.g. Hackathon, Project, StartUp, Study Partner, ..."
              onAdd={(e) => handleKeyDown(e, lookingFor, setLookingFor)}
              onRemove={(tag) => removeTag(tag, setLookingFor)}
            />
            <TagInput
              label="Preferred Roles"
              tags={preferredRoles}
              placeholder="Type Frontend, Designer, ML Engineer.. and hit Enter"
              onAdd={(e) => handleKeyDown(e, preferredRoles, setPreferredRoles)}
              onRemove={(tag) => removeTag(tag, setPreferredRoles)}
            />
          </div>

          <div className="space-y-4">
            <Label className="uppercase text-xs font-black tracking-widest">
              About Me
            </Label>
            <Textarea
              className="h-40 rounded-2xl border-gray-100 bg-[#FDFCF0]/30"
              placeholder="Write something that makes teammates want to work with you..."
              value={formData.about_me}
              onChange={(e) =>
                setFormData({ ...formData, about_me: e.target.value })
              }
            />
          </div>

          <Button
            disabled={loading}
            type="submit"
            className="w-full h-16 bg-[#064E3B] text-white text-lg font-black uppercase tracking-tighter hover:bg-[#064E3B]/90 rounded-2xl shadow-xl shadow-[#064E3B]/10"
          >
            {loading ? "Optimizing Profile..." : "Publish Profile"}
          </Button>
        </form>
      </div>
    </div>
  );
};

// Fixed TagInput Component
const TagInput = ({ label, placeholder, tags, onAdd, onRemove }) => (
  <div className="space-y-3">
    <Label className="uppercase text-xs font-black tracking-widest text-[#064E3B]">
      {label}
    </Label>
    <Input
      placeholder={placeholder || "Type and hit Enter"}
      onKeyDown={onAdd}
      className="rounded-xl border-gray-100"
    />
    <div className="flex flex-wrap gap-2 pt-1">
      {tags.map((tag, index) => (
        <Badge
          key={`${tag}-${index}`}
          className="bg-[#064E3B] hover:bg-[#064E3B] text-white px-3 py-1.5 rounded-full flex items-center gap-2 transition-all"
        >
          {tag}
          <button
            type="button" // Important: prevents form submission
            onClick={() => onRemove(tag)}
            className="hover:bg-white/20 rounded-full p-0.5"
          >
            <X size={12} />
          </button>
        </Badge>
      ))}
    </div>
  </div>
);

export default ProfileSetup;
