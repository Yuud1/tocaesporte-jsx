import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import News from './pages/News';
import Login from './pages/admin/login/Login';
import NotFound from './pages/NotFound';
import Sobre from './pages/linksUseful/Sobre';
import Termos from './pages/linksUseful/Termos';
import Privacidade from './pages/linksUseful/Privacidade';

import DashboardAdmin from './pages/admin/dashboard/DashboardAdmin';
import CreatePostAdmin from './components/post/postAdmin/CreatePostAdmin';
import EditPostAdmin from './components/post/postAdmin/EditPostAdmin';
import PostsAdmin from './components/post/postAdmin/PostAdmin';
import AdsAdmin from './components/adversing/adversingAdmin/AdsAdmin';
import CreateAdAdmin from './components/adversing/adversingAdmin/CreateAdAdmin';
import Users from './components/user/Users';
import CreateUser from './components/user/CreateUser';

import DashboardUser from './pages/admin/dashboard/DashboardUser';
import CreatePostUser from './components/post/postUser/CreatePostUser';
import EditPostUser from './components/post/postUser/EditPostUser';
import PostsUser from './components/post/postUser/PostUser';
import AdsUser from './components/adversing/adversingUser/AdsUser';
import CreateAdUser from './components/adversing/adversingUser/CreateAdUser';

import './index.css';
import Category from './pages/Category';

import ProtectedRoute from './components/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* 🌍 Rotas Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/news/:id/:slug?" element={<News />} />
        <Route path="/category" element={<Category />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/termos" element={<Termos />} />
        <Route path="/privacidade" element={<Privacidade />} />
        <Route path="/login" element={<Login />} />

        {/* 🔒 Rotas Protegidas para Admin */}
        <Route
          path="/dashboardAdmin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/postsAdmin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <PostsAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-post-admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <CreatePostAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-post-admin/:id"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <EditPostAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adsAdmin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdsAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-ad-admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <CreateAdAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-user"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <CreateUser />
            </ProtectedRoute>
          }
        />

        {/* 👥 Rotas Protegidas para Usuário */}
        <Route
          path="/dashboardUser"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <DashboardUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/postsUser"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <PostsUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-post-user"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <CreatePostUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-post/:id"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <EditPostUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adsUser"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <AdsUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-ad-user"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <CreateAdUser />
            </ProtectedRoute>
          }
        />

        {/* 🚨 Página Não Encontrada */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;