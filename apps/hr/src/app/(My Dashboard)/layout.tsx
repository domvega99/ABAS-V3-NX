"use client";
import { Box, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/header/Header";
import Sidebar from "../components/layout/sidebar/Sidebar";
import SidebarPopup from "../components/layout/sidebar/SidebarPopup";
import Topbar from "../components/layout/topbar/Topbar";
import { initializeSubMenuStyle } from "../state/slice/styles/subMenuStyleSlice";
import { RootState } from "../state/store";
import Menuitems from "./layout/sidebar/MenuItems";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
}));

export default function RootLayout({ children, }: { children: React.ReactNode; }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const dispatch = useDispatch();
  const subMenuStyle = useSelector((state: RootState) => state.subMenuStyle.SubMenuStyle);

  useEffect(() => {
    dispatch(initializeSubMenuStyle());
  }, [dispatch]);
  
  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!isMobileSidebarOpen); 
  };

  const contentWidth = isSidebarCollapsed ? 'calc(100vw - 100px)' : 'calc(100vw - 340px)';

  return (
    <MainWrapper className="mainwrapper" sx={{ overflow: { lg: 'hidden' } }}>
      {/* Sidebar */}
      {subMenuStyle === 'Sidebar' && (
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)} 
          isSidebarCollapsed={isSidebarCollapsed}
          Menuitems={Menuitems}
        />
      )}
      {/* Popup Sidebar */}
      <SidebarPopup
        isMobileSidebarOpen={isMobileSidebarOpen}  
        onSidebarClose={() => setMobileSidebarOpen(false)} 
        isSidebarCollapsed={isSidebarCollapsed}
        Menuitems={Menuitems}
      />
      {/* Main Wrapper */}
      <PageWrapper className="page-wrapper">
        {/* Header */}
        <Header
          toggleMobileSidebar={toggleMobileSidebar} 
          toggleSidebarCollapse={() => setSidebarCollapsed(!isSidebarCollapsed)}
        />
        <Box sx={{ bgcolor: 'background.paper' }}>
          {subMenuStyle === 'Topbar' && (
            <Topbar />
          )}
        </Box>
        {/* PageContent */}
        <Box
          sx={{
            margin: { xs: 0, lg: '20px' }, 
            height: {
              xs: '100vh',
              lg: subMenuStyle === 'Sidebar' ? '88vh' : '82vh',
            },
            width: {
              xs: '100vw', 
              lg: subMenuStyle === 'Sidebar' ? contentWidth : 'calc(100vw - 40px)',
            },
          }}
        >
          {children}
        </Box>
      </PageWrapper>
    </MainWrapper>
  );
}
