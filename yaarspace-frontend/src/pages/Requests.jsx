import React, { useEffect, useState } from "react";
import {
  getReceivedRequestsApi,
  getSentRequestsApi,
  acceptConnectionApi,
  rejectConnectionApi,
  removeSentRequestApi,
} from "@/api/connectionApi";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Check, X, Trash2 } from "lucide-react";
import { toast } from "sonner";

const Requests = () => {
  const [activeTab, setActiveTab] = useState("people");
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRequests = async () => {
    try {
      setLoading(true);

      const [receivedRes, sentRes] = await Promise.all([
        getReceivedRequestsApi(),
        getSentRequestsApi(),
      ]);

      setReceivedRequests(receivedRes.requests || []);
      setSentRequests(sentRes.requests || []);
    } catch (error) {
      toast.error("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAccept = async (connectionId) => {
    try {
      await acceptConnectionApi(connectionId);
      toast.success("Connection accepted");
      fetchRequests();
    } catch (error) {
      toast.error("Failed to accept request");
    }
  };

  const handleReject = async (connectionId) => {
    try {
      await rejectConnectionApi(connectionId);
      toast.success("Connection rejected");
      fetchRequests();
    } catch (error) {
      toast.error("Failed to reject request");
    }
  };

  const handleRemove = async (connectionId) => {
    try {
      await removeSentRequestApi(connectionId);
      toast.success("Request removed");
      fetchRequests();
    } catch (error) {
      toast.error("Failed to remove request");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF0] px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#064E3B]">
            Connection Requests
          </h1>
          <p className="mt-2 text-[#475569]">
            Manage people who want to connect with you and requests you sent.
          </p>
        </div>

        <div className="mb-8 flex gap-3 rounded-2xl bg-white p-2 shadow-sm border">
          <button
            onClick={() => setActiveTab("people")}
            className={`flex-1 rounded-xl px-4 py-3 font-medium transition ${
              activeTab === "people"
                ? "bg-[#064E3B] text-white"
                : "text-[#475569] hover:bg-slate-100"
            }`}
          >
            People
          </button>

          <button
            onClick={() => setActiveTab("you")}
            className={`flex-1 rounded-xl px-4 py-3 font-medium transition ${
              activeTab === "you"
                ? "bg-[#064E3B] text-white"
                : "text-[#475569] hover:bg-slate-100"
            }`}
          >
            You
          </button>
        </div>

        {loading ? (
          <p className="text-[#475569]">Loading requests...</p>
        ) : activeTab === "people" ? (
          <div className="space-y-5">
            {receivedRequests.length === 0 ? (
              <EmptyState text="No pending requests received." />
            ) : (
              receivedRequests.map((request) => (
                <RequestCard
                  key={request.id}
                  profile={request.sender}
                  action={
                    <div className="flex gap-3">
                      <Button
                        onClick={() => handleAccept(request.id)}
                        className="bg-[#064E3B] hover:bg-[#04392B] text-white"
                      >
                        <Check className="mr-2 h-4 w-4" />
                        Accept
                      </Button>

                      <Button
                        onClick={() => handleReject(request.id)}
                        variant="outline"
                        className="border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <X className="mr-2 h-4 w-4" />
                        Reject
                      </Button>
                    </div>
                  }
                />
              ))
            )}
          </div>
        ) : (
          <div className="space-y-5">
            {sentRequests.length === 0 ? (
              <EmptyState text="No pending requests sent." />
            ) : (
              sentRequests.map((request) => (
                <RequestCard
                  key={request.id}
                  profile={request.receiver}
                  action={
                    <Button
                      onClick={() => handleRemove(request.id)}
                      variant="outline"
                      className="border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remove
                    </Button>
                  }
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const RequestCard = ({ profile, action }) => {
  return (
    <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition">
      <CardContent className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-5">
          <Avatar className="h-20 w-20 border">
            <AvatarImage src={profile?.avatar_url} />
            <AvatarFallback>
              {profile?.full_name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>

          <div>
            <h2 className="text-xl font-bold text-slate-950">
              {profile?.full_name}
            </h2>

            <p className="text-sm text-[#475569]">
              {profile?.college_name || "College not added"}
            </p>

            <p className="mt-1 max-w-xl text-sm text-[#475569]">
              {profile?.about_me || "No bio added yet."}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {profile?.tech_stack?.slice(0, 4).map((skill) => (
                <Badge
                  key={skill}
                  className="bg-[#FDFCF0] text-[#064E3B] border border-[#064E3B]/20"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {action}
      </CardContent>
    </Card>
  );
};

const EmptyState = ({ text }) => {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
      <p className="font-medium text-[#475569]">{text}</p>
    </div>
  );
};

export default Requests;