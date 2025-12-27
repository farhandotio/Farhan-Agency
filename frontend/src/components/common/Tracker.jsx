import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { UAParser } from 'ua-parser-js';
import { useLocation } from 'react-router-dom';
import { trackVisitorAction } from '../../app/features/visitor/visitorSlice';

const Tracker = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const trackUser = () => {
      try {
        // Browser/Device info detect kora
        const parser = new UAParser();
        const result = parser.getResult();

        const visitorData = {
          // Location data amra pathachchi na, backend 'geoip-lite' diye auto dhore nibe
          device: result.device.type || 'Desktop',
          os: result.os.name || 'Unknown',
          browser: result.browser.name || 'Unknown',
          screenResolution: `${window.screen.width}x${window.screen.height}`,

          // Route/Page tracking
          pageVisited: location.pathname,
          referrer: document.referrer || 'Direct',
          language: navigator.language,
          isNewVisitor: !localStorage.getItem('visited_before'),
        };

        // Redux thunk call kora (ja backend-e data pathabe)
        dispatch(trackVisitorAction(visitorData));

        // First time visit mark kora
        localStorage.setItem('visited_before', 'true');
      } catch (error) {
        console.error('Tracking Error:', error.message);
      }
    };

    trackUser();
  }, [dispatch, location.pathname]); // Route change holei call hobe

  return null;
};

export default Tracker;
