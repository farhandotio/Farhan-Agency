import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const { order } = useSelector((state) => state.auth);

  console.log(order)


  // Fallback if user data is missing
  const client = {
    avatar: user?.picture || "https://i.pravatar.cc/150?img=12",
    name: user?.fullname.firstName + user?.fullname.lastName || "John Doe",
    email: user?.email || "john.doe@example.com",
    company: user?.company || "Acme Corp",
    role: user?.role || "Client",
  };

  // Use dynamic projects if available, otherwise fallback
  const projects = user?.projects || [
    { id: 1, name: "Website Redesign", status: "In Progress" },
    { id: 2, name: "SEO Optimization", status: "Requested" },
    { id: 3, name: "Social Media Campaign", status: "Completed" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-7 lg:px-10 py-30">
      {/* Top Section */}
      <div className="flex flex-col items-center text-center bg-bg shadow-md rounded-lg p-6 mb-6">
        <img
          src={client.avatar}
          alt={client.name}
          className="w-24 h-24 object-cover rounded-full mb-4"
        />
        <h2 className="relative text-2xl font-semibold">
          {client.name}{" "}
          <span className="text-white text-xs absolute -top-3 -right-10 bg-primary rounded-full px-2 py-0.5">
            {" "}
            {client.role}{" "}
          </span>
        </h2>
        <p className="text-mutedText">{client.email}</p>
      </div>

      {/* Bottom Section */}
      <div className="bg-cardBg shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Projects</h3>
        <ul className="space-y-3">
          {projects.map((project) => (
            <li
              key={project.id}
              className="flex justify-between items-center p-3 border border-border rounded-lg hover:shadow-sm transition hover:bg-hoverCardBg"
            >
              <span className="font-medium">{project.name}</span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  project.status === "In Progress"
                    ? "bg-blue-100/5 text-blue-400"
                    : project.status === "Requested"
                    ? "bg-yellow-100/5 text-warning"
                    : "bg-green-100/5 text-success"
                }`}
              >
                {project.status}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-row gap-4 justify-center">
        <button className="px-6 py-3 bg-primary hover:bg-hoverPrimary text-white font-semibold rounded-full transition cursor-pointer">
          Start New Project
        </button>
        <button className="px-6 py-3 border border-border hover:bg-hoverCardBg cursor-pointer font-semibold rounded-full transition">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
