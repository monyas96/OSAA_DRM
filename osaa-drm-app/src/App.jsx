import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import ExplanatoryView from './pages/ExplanatoryView'
import EvidenceProcessView from './pages/EvidenceProcessView'
import PolicyBrief41 from './pages/policy-briefs/PolicyBrief41'
import PolicyBrief42 from './pages/policy-briefs/PolicyBrief42'
import PolicyBrief43 from './pages/policy-briefs/PolicyBrief43'
import PolicyBrief44 from './pages/policy-briefs/PolicyBrief44'
import StreamlitEmbed from './components/StreamlitEmbed'
import DemoMode from './components/DemoMode'

// Wrapper to show Streamlit Theme 4 for Exploratory view
const ExploratoryStreamlit = () => {
  // Directly render StreamlitEmbed for theme-4 (Exploratory view)
  return <StreamlitEmbed page="theme-4" />
}

function App() {
  return (
    <Router>
      <DemoMode />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/exploratory" element={<ExploratoryStreamlit />} />
        <Route path="/explanatory" element={<ExplanatoryView />} />
        <Route path="/evidence-process" element={<EvidenceProcessView />} />
        {/* Topic 4.1 uses Streamlit (like other topics) */}
        <Route path="/topic/4.1" element={<Navigate to="/streamlit/topic-4-1" replace />} />
        {/* Policy Brief 4.1 */}
        <Route path="/policy-brief/4.1" element={<PolicyBrief41 />} />
        {/* Policy Brief 4.2 */}
        <Route path="/policy-brief/4.2" element={<PolicyBrief42 />} />
        {/* Policy Brief 4.3 */}
        <Route path="/policy-brief/4.3" element={<PolicyBrief43 />} />
        {/* Policy Brief 4.4 */}
        <Route path="/policy-brief/4.4" element={<PolicyBrief44 />} />
        {/* Topic 4.1 uses Streamlit */}
        <Route path="/streamlit/topic-4-1" element={<StreamlitEmbed page="topic-4-1" />} />
        {/* Topics 4.2, 4.3, 4.4 use Streamlit pages via StreamlitEmbed */}
        <Route path="/streamlit/:page" element={<StreamlitEmbed />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App

