import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { DashboardLayout } from "./components/DashboardLayout";
import { Home } from './Pages/Home/Home';
import { Templates } from './Pages/Templates/Templates';
import { AuthProvider } from './contexts/AuthContext';
import { Editor } from './Pages/Editor/Editor';
import { Plans } from "./Pages/Plans/Plans";
import { Checkout } from "./Pages/Checkout/Checkout";
import { Contato } from "./Pages/Contato/Contato";
import { Settings } from "./Pages/Settings/Settings";
import { Login } from "./Pages/Login/Login";
import { Register } from "./Pages/Register/Register";
import { Dashboard } from "./Pages/Dashboard/Dashboard";
import { MeusCurriculos } from "./Pages/MeusCurriculos/MeusCurriculos";
import { MeuPlano } from "./Pages/MeuPlano/MeuPlano";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          {/* Navbar fixa no topo */}
          <Navbar />

          {/* Container principal com as rotas */}
          <main style={{ flex: 1 }}>
            <Routes>
              {/* ROTAS SEM SIDEBAR (Login/Register) */}
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Register />} />

              {/* ROTAS COM SIDEBAR (quando logado) */}
              <Route path="/" element={
                <DashboardLayout><Home /></DashboardLayout>
              } />

              <Route path="/templates" element={
                <DashboardLayout><Templates /></DashboardLayout>
              } />

              <Route path="/editor/:templateId" element={
                <DashboardLayout><Editor /></DashboardLayout>
              } />

              <Route path="/plans" element={
                <DashboardLayout><Plans /></DashboardLayout>
              } />

              <Route path="/checkout/:planId" element={
                <DashboardLayout><Checkout /></DashboardLayout>
              } />

              <Route path="/contato" element={
                <DashboardLayout><Contato /></DashboardLayout>
              } />

              <Route path="/config" element={
                <DashboardLayout><Settings /></DashboardLayout>
              } />

              <Route path="/dashboard" element={
                <DashboardLayout><Dashboard /></DashboardLayout>
              } />

              <Route path="/meus-curriculos" element={
                <DashboardLayout><MeusCurriculos /></DashboardLayout>
              } />

              <Route path="/meu-plano" element={
                <DashboardLayout><MeuPlano /></DashboardLayout>
              } />

            </Routes>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
