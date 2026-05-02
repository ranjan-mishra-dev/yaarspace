import { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import {
  getNotificationsApi,
  markNotificationReadApi,
} from "@/api/notificationApi";
import { Button } from "@/components/ui/button";

const NavbarNotifications = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const notificationRef = useRef(null);

  const fetchNotifications = async () => {
    const res = await getNotificationsApi();
    setNotifications(res.notifications || []);
    setUnreadCount(res.unreadCount || 0);
  };

  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(fetchNotifications, 15000);

    return () => clearInterval(interval);
  }, []);

  // close notification when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleRead = async (notificationId) => {
    await markNotificationReadApi(notificationId);
    fetchNotifications();
  };

  return (
    <div ref={notificationRef} className="relative z-[9999]">
      <Button
        variant="ghost"
        onClick={() => setOpen((prev) => !prev)}
        className="relative text-[#475569] hover:text-[#064E3B]"
      >
        <Bell className="h-5 w-5" />

        {unreadCount > 0 && (
          <span className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs text-white">
            {unreadCount}
          </span>
        )}
      </Button>

      {open && (
        <div className="absolute right-0 top-full z-[9999] mt-3 w-80 rounded-2xl border bg-white p-3 shadow-xl">
          <h3 className="mb-3 px-2 font-semibold text-[#064E3B]">
            Notifications
          </h3>

          {notifications.length === 0 ? (
            <p className="px-2 py-5 text-center text-sm text-[#475569]">
              No notifications yet.
            </p>
          ) : (
            <div className="max-h-96 space-y-2 overflow-y-auto">
              {notifications.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleRead(item.id)}
                  className={`w-full rounded-xl p-3 text-left transition ${
                    item.is_read
                      ? "bg-white hover:bg-slate-50"
                      : "bg-[#FDFCF0] hover:bg-[#f8f4d8]"
                  }`}
                >
                  <p className="text-sm font-semibold text-slate-900">
                    {item.title}
                  </p>

                  <p className="mt-1 text-sm text-[#475569]">
                    {item.message}
                  </p>

                  {!item.is_read && (
                    <span className="mt-2 inline-block rounded-full bg-[#064E3B] px-2 py-0.5 text-xs text-white">
                      New
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NavbarNotifications;