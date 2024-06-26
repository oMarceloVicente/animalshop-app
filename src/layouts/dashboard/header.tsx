"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import PetsIcon from "@mui/icons-material/Pets";
import { useRouter } from "next/navigation";
import { endpoints } from "@/utils/axios";
import { signOut, useSession } from "next-auth/react";
import Avatar from "@/components/avatar/avatar";

const pages = ["Shop", "Contacts", "About"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

type Props = {
  children: React.ReactNode;
};

const Header = ({ children }: Props) => {
  const router = useRouter();
  const session = useSession();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (name: string) => {
    if (name === "Logout") {
      handleLogout();
    }
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    try {
      signOut({
        callbackUrl: `${window.location.href}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickMenu = (name: string) => {
    router.push(`/pawstore/${name.toLowerCase()}`);
  };

  const handleLogin = async () => {
    router.push(`/${endpoints.login}`);
  };

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "#8FBC8F" }}>
        <Container maxWidth={false}>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href={`/${endpoints.pawstore.home}`}
              sx={{
                mr: 3,
                display: { xs: "none", md: "flex" },
              }}
            >
              <PetsIcon fontSize="large" />
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={() => handleClickMenu(page)}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href={`/${endpoints.pawstore.home}`}
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
              }}
            >
              <PetsIcon />
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => handleClickMenu(page)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            {session.status === "authenticated" && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      src={session.data?.user?.image || undefined}
                      alt={session.data?.user?.name || undefined}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => handleCloseUserMenu(setting)}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}
            {session.status === "unauthenticated" && (
              <Box>
                <Button
                  onClick={() => handleLogin()}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Login
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      {children}
    </>
  );
};

export default Header;
