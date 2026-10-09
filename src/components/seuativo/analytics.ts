/**
 * Tracking Helper para a página /seuativo da Quark Energy
 */

export type TrackingEventName =
  | 'seuativo_page_view'
  | 'quarkerize_cta_click'
  | 'asset_form_started'
  | 'asset_form_submitted'
  | 'asset_type_selected'
  | 'fundraising_value_selected'
  | 'whatsapp_click'
  | 'specialist_contact_click';

export const trackSeuAtivoEvent = (
  eventName: TrackingEventName,
  eventParams?: Record<string, any>
) => {
  try {
    const payload = {
      event: eventName,
      timestamp: new Date().toISOString(),
      path: typeof window !== 'undefined' ? window.location.pathname : '/seuativo',
      ...eventParams
    };

    // Log para auditoria / depuração local
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[QUARK TRACKING] ${eventName}:`, payload);
    }

    // Dispara evento DOM personalizado para escuta por tags ou integrações futuras (GTM, etc.)
    if (typeof window !== 'undefined') {
      const customEvent = new CustomEvent('quark_analytics_event', { detail: payload });
      window.dispatchEvent(customEvent);

      // Compatibilidade com dataLayer do GTM se presente
      if ((window as any).dataLayer && Array.isArray((window as any).dataLayer)) {
        (window as any).dataLayer.push(payload);
      }
    }
  } catch (err) {
    // Silently handle tracking errors
  }
};
