"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { SidebarMenuButton } from "@/components/ui/sidebar"; // Import SidebarMenuButton

export function SignOutButton() {
  const handleSignOut = () => {
    document.body.classList.add("fade-out");

    setTimeout(() => {
      localStorage.removeItem("selectedSeer");
      signOut({ callbackUrl: "/login" });
    }, 300);
  };

  return (
    // Use SidebarMenuButton for consistent styling within the sidebar footer
    <SidebarMenuButton
      asChild
      tooltip="Déconnexion"
      className="w-full justify-start" // Adjust alignment if needed
      onClick={handleSignOut} // Use onClick for client-side action
    >
      <button>
        <LogOut />
        <span className="group-data-[collapsible=icon]:hidden">
          Déconnexion
        </span>
      </button>
    </SidebarMenuButton>
  );
}
