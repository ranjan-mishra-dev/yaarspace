import React, { useState, useEffect } from "react";
import {
  Search,
  UserPlus,
  Terminal, // Replaces Github
  Briefcase,
  ExternalLink,
  X,
  Code2,
  GraduationCap,
} from "lucide-react";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock suggestions - In production, fetch these from your Supabase 'skills' or 'colleges' table
  const allSuggestions = [
    "React",
    "Node.js",
    "ReLU University",
    "Parul University",
    "Stanford",
    "Python",
    "MongoDB",
    "IIT Delhi",
  ];

  useEffect(() => {
    if (query.length > 2) {
      const filtered = allSuggestions.filter((s) =>
        s.toLowerCase().includes(query.toLowerCase()),
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSearch = async (searchTerm) => {
    setLoading(true);
    setQuery(searchTerm);
    setSuggestions([]);
    try {
      console.log("search query", searchTerm);
      // Replace with your actual Node.js backend endpoint
      const response = await fetch(
        `http://localhost:5000/api/search?query=${searchTerm}`,
      );
      const data = await response.json();
      console.log("data from search page", data);
      setResults(data.slice(0, 20)); // Limit to 20 as per your requirement
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Search Section */}
      <div className="relative z-50">
        <Command className="rounded-lg border shadow-md">
          <CommandInput
            placeholder="Search by college or skill (e.g. 'React')..."
            value={query}
            onValueChange={setQuery}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(query)}
          />
          {suggestions.length > 0 && (
            <CommandList>
              <CommandGroup heading="Suggestions">
                {suggestions.map((s) => (
                  <CommandItem
                    key={s}
                    onSelect={() => handleSearch(s)}
                    className="cursor-pointer"
                  >
                    {s}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          )}
        </Command>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {loading ? (
          <p className="text-center text-muted-foreground">
            Finding your next teammate...
          </p>
        ) : (
          results.map((user) => (
            <Card
              key={user.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedUser(user)}
            >
              <CardContent className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border">
                    <AvatarImage src={user.profile_pic} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-lg">{user.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {user.about_me}
                    </p>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {user.tech_stack.slice(0, 3).map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-[10px]"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <Button
                  onClick={(e) => {
                    e.stopPropagation(); // Don't trigger the "View More" modal
                    console.log("Connect with", user.id);
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <UserPlus className="mr-2 h-4 w-4" /> Connect
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Expanded User Detail Modal */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        {selectedUser && (
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-2xl">
                {selectedUser.name}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-blue-500" />
                  <span>
                    {selectedUser.college_name} ({selectedUser.year} Year)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Code2 className="h-4 w-4 text-green-500" />
                  <span>{selectedUser.branch}</span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Looking For:</h4>
                <p className="text-sm bg-orange-50 p-3 rounded-md border border-orange-100 text-orange-800">
                  {selectedUser.looking_for}
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2 text-sm">
                  Professional Links:
                </h4>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                    asChild
                  >
                    <a href={selectedUser.github} target="_blank">
                      <Terminal className="h-4 w-4" /> Code Profile
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                    asChild
                  >
                    <a href={selectedUser.linkedin} target="_blank">
                      <Briefcase className="h-4 w-4" /> Professional
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                    asChild
                  >
                    <a href={selectedUser.coding_profile} target="_blank">
                      <ExternalLink className="h-4 w-4" /> Portfolio
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <DialogClose asChild>
                <Button variant="ghost">Close</Button>
              </DialogClose>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default SearchPage;
