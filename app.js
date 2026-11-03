(function () {
  'use strict';

  const STORAGE_KEY = 'le_wouri_hotel_cameroun_v2';

  function formatFCFA(amount) {
    if (isNaN(amount) || amount === null) return '0 FCFA';
    const rounded = Math.round(amount);
    return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' FCFA';
  }

  function getRelativeDate(offsetDays) {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return d.toISOString().split('T')[0];
  }

  function getRelativeDateTime(offsetDays) {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return d.toISOString().replace('T', ' ').substring(0, 19);
  }

  const DEFAULT_DATA = {
    clients: [
      {
        client_id: 1,
        first_name: 'Pr. Jean-Paul',
        last_name: 'Mbarga',
        phone: '+237 699 45 12 80',
        email: 'jp.mbarga@univ-yaounde1.cm',
        vip_tier: 'Or',
        notes: 'Doyen universitaire. Chambre calme requise pour rédaction. Climatisation silencieuse.'
      },
      {
        client_id: 2,
        first_name: 'Aïssatou',
        last_name: 'Bello',
        phone: '+237 677 30 19 84',
        email: 'aissatou.bello@afrilandfirstbank.com',
        vip_tier: 'Platine',
        notes: 'Cadre bancaire en mission. Arrivée tardive par le vol Camair-Co de 18h30. Facture proforma société.'
      },
      {
        client_id: 3,
        first_name: 'Suzanne',
        last_name: 'Mballa',
        phone: '+237 675 11 44 22',
        email: 'suzanne.mballa@orange.cm',
        vip_tier: 'Or',
        notes: 'Séjour anniversaire de mariage. Corbeille de fruits exotiques et vin blanc frais en chambre.'
      },
      {
        client_id: 4,
        first_name: 'Christian',
        last_name: 'Tchouta',
        phone: '+237 694 22 88 10',
        email: 'christian.tchouta@logistics-douala.com',
        vip_tier: 'Standard',
        notes: 'Transit portuaire Bonanjo. Réveil demandé à 06h00 pour départ chantier.'
      },
      {
        client_id: 5,
        first_name: 'Nadine',
        last_name: 'Essomba',
        phone: '+237 691 55 77 33',
        email: 'nadine.essomba@mincommerce.gov.cm',
        vip_tier: 'Platine',
        notes: 'Délégation ministérielle. Salon de travail nécessaire, thé kinkeliba au réveil.'
      },
      {
        client_id: 6,
        first_name: 'Ibrahim',
        last_name: 'Njoya',
        phone: '+237 670 14 99 00',
        email: 'i.njoya@arts-foumban.cm',
        vip_tier: 'Standard',
        notes: 'Artisan d\'art en exposition à l\'Institut Français.'
      }
    ],

    room_types: [
      { room_type_id: 1, name: 'Chambre Confort Côté Jardin', description: 'Lit King, grand balcon privatif, vue sur le jardin tropical et palmiers.' },
      { room_type_id: 2, name: 'Suite Junior Exécutive', description: 'Salon privé de travail, bureau en bois massif d\'Iroko, douche à l\'italienne en marbre.' },
      { room_type_id: 3, name: 'Suite Prestige Wouri', description: 'Vue panoramique sur le fleuve Wouri, jacuzzi privatif, salon d\'honneur et terrasse.' },
      { room_type_id: 4, name: 'Suite Familiale Baobab', description: 'Deux chambres communicantes, grand salon, idéale pour séjours familiaux ou de prestige.' }
    ],

    room_statuses: [
      { room_status_id: 1, name: 'Disponible' },
      { room_status_id: 2, name: 'Occupée' },
      { room_status_id: 3, name: 'Nettoyage' },
      { room_status_id: 4, name: 'Maintenance' }
    ],

    amenities: [
      { amenity_id: 1, name: 'Fibre Optique Haut Débit' },
      { amenity_id: 2, name: 'Lit King Size Orthopédique' },
      { amenity_id: 3, name: 'Climatisation Inverter Silencieuse' },
      { amenity_id: 4, name: 'Groupe Électrogène 24h/24 & Eau filtrée' },
      { amenity_id: 5, name: 'Smart TV Canal+ & Bouquet Sport' },
      { amenity_id: 6, name: 'Cafetière Espresso & Thés Locaux' },
      { amenity_id: 7, name: 'Jacuzzi & Baignoire Profonde' },
      { amenity_id: 8, name: 'Mini-Bar & Jus Frais Naturels' }
    ],

    room_amenities: [
      { room_id: 101, amenity_id: 1 }, { room_id: 101, amenity_id: 2 }, { room_id: 101, amenity_id: 3 }, { room_id: 101, amenity_id: 4 }, { room_id: 101, amenity_id: 5 },
      { room_id: 102, amenity_id: 1 }, { room_id: 102, amenity_id: 2 }, { room_id: 102, amenity_id: 3 }, { room_id: 102, amenity_id: 4 }, { room_id: 102, amenity_id: 6 },
      { room_id: 103, amenity_id: 1 }, { room_id: 103, amenity_id: 2 }, { room_id: 103, amenity_id: 3 }, { room_id: 103, amenity_id: 4 }, { room_id: 103, amenity_id: 8 },
      { room_id: 201, amenity_id: 1 }, { room_id: 201, amenity_id: 2 }, { room_id: 201, amenity_id: 3 }, { room_id: 201, amenity_id: 4 }, { room_id: 201, amenity_id: 5 }, { room_id: 201, amenity_id: 6 },
      { room_id: 202, amenity_id: 1 }, { room_id: 202, amenity_id: 2 }, { room_id: 202, amenity_id: 3 }, { room_id: 202, amenity_id: 4 },
      { room_id: 203, amenity_id: 1 }, { room_id: 203, amenity_id: 2 }, { room_id: 203, amenity_id: 3 }, { room_id: 203, amenity_id: 4 }, { room_id: 203, amenity_id: 6 }, { room_id: 203, amenity_id: 8 },
      { room_id: 301, amenity_id: 1 }, { room_id: 301, amenity_id: 2 }, { room_id: 301, amenity_id: 3 }, { room_id: 301, amenity_id: 4 }, { room_id: 301, amenity_id: 5 }, { room_id: 301, amenity_id: 6 }, { room_id: 301, amenity_id: 7 }, { room_id: 301, amenity_id: 8 },
      { room_id: 302, amenity_id: 1 }, { room_id: 302, amenity_id: 2 }, { room_id: 302, amenity_id: 3 }, { room_id: 302, amenity_id: 4 }, { room_id: 302, amenity_id: 5 }, { room_id: 302, amenity_id: 7 }
    ],

    rooms: [
      { room_id: 101, room_number: '101', floor: 1, room_type_id: 1, room_status_id: 2, max_capacity: 2, base_price_per_night: 55000 },
      { room_id: 102, room_number: '102', floor: 1, room_type_id: 1, room_status_id: 1, max_capacity: 2, base_price_per_night: 55000 },
      { room_id: 103, room_number: '103', floor: 1, room_type_id: 4, room_status_id: 3, max_capacity: 4, base_price_per_night: 90000 },
      { room_id: 201, room_number: '201', floor: 2, room_type_id: 2, room_status_id: 2, max_capacity: 3, base_price_per_night: 110000 },
      { room_id: 202, room_number: '202', floor: 2, room_type_id: 1, room_status_id: 1, max_capacity: 2, base_price_per_night: 60000 },
      { room_id: 203, room_number: '203', floor: 2, room_type_id: 2, room_status_id: 1, max_capacity: 3, base_price_per_night: 115000 },
      { room_id: 301, room_number: '301', floor: 3, room_type_id: 3, room_status_id: 2, max_capacity: 4, base_price_per_night: 220000 },
      { room_id: 302, room_number: '302', floor: 3, room_type_id: 3, room_status_id: 4, max_capacity: 4, base_price_per_night: 220000 }
    ],

    reservations: [
      {
        reservation_id: 1001,
        client_id: 1,
        check_in_date: getRelativeDate(-2),
        check_out_date: getRelativeDate(2),
        guest_count: 2,
        status: 'checked_in',
        created_at: getRelativeDateTime(-10),
        cancelled_at: null,
        special_requests: 'Séjour académique. Facturation adressée au Rectorat.'
      },
      {
        reservation_id: 1002,
        client_id: 2,
        check_in_date: getRelativeDate(-1),
        check_out_date: getRelativeDate(3),
        guest_count: 1,
        status: 'checked_in',
        created_at: getRelativeDateTime(-6),
        cancelled_at: null,
        special_requests: 'Paiement pris en charge via Orange Money d\'entreprise.'
      },
      {
        reservation_id: 1003,
        client_id: 3,
        check_in_date: getRelativeDate(0),
        check_out_date: getRelativeDate(4),
        guest_count: 2,
        status: 'confirmed',
        created_at: getRelativeDateTime(-3),
        cancelled_at: null,
        special_requests: 'Fête de mariage. Prévoir mise en place romantique en Suite 301.'
      },
      {
        reservation_id: 1004,
        client_id: 5,
        check_in_date: getRelativeDate(1),
        check_out_date: getRelativeDate(4),
        guest_count: 1,
        status: 'confirmed',
        created_at: getRelativeDateTime(-2),
        cancelled_at: null,
        special_requests: 'Prévoir chauffeur pour rendez-vous à la Délégation Régionale.'
      },
      {
        reservation_id: 1005,
        client_id: 4,
        check_in_date: getRelativeDate(-4),
        check_out_date: getRelativeDate(-1),
        guest_count: 1,
        status: 'checked_out',
        created_at: getRelativeDateTime(-15),
        cancelled_at: null,
        special_requests: 'Transit portuaire accompli avec succès.'
      }
    ],

    reservation_rooms: [
      { reservation_id: 1001, room_id: 101, nightly_price: 55000 },
      { reservation_id: 1002, room_id: 201, nightly_price: 110000 },
      { reservation_id: 1003, room_id: 301, nightly_price: 220000 },
      { reservation_id: 1004, room_id: 203, nightly_price: 115000 },
      { reservation_id: 1005, room_id: 103, nightly_price: 90000 }
    ],

    services: [
      {
        service_id: 1,
        name: 'Dîner Dégustation Ndolè Royal & Gambas de Kribi',
        description: 'Préparé selon la grande tradition sawa, accompagné de miondo frais et plantains vapeur.',
        price: 18500,
        slot_duration_minutes: 90,
        slot_capacity: 20
      },
      {
        service_id: 2,
        name: 'Navette Aéroport Douala (Véhicule VIP Climatisé)',
        description: 'Prise en charge personnalisée avec chauffeur professionnel dès la sortie du terminal.',
        price: 25000,
        slot_duration_minutes: 45,
        slot_capacity: 4
      },
      {
        service_id: 3,
        name: 'Soin Relaxant aux Baumes Pur Karité & Huile de Coco',
        description: 'Massage musculaire profond et détente aux senteurs naturelles d\'Afrique centrale.',
        price: 30000,
        slot_duration_minutes: 75,
        slot_capacity: 2
      },
      {
        service_id: 4,
        name: 'Grand Buffet Petit-Déjeuner Camerounais & Continental',
        description: 'Fruits frais de Penja, beignets-haricots-bouillie, œufs fermiers, café des Hauts Plateaux.',
        price: 8500,
        slot_duration_minutes: 60,
        slot_capacity: 35
      },
      {
        service_id: 5,
        name: 'Location Salle de Conférence & Visioconférence',
        description: 'Écran interactif, sonorisation complète, micro sans fil et service pause-café inclus.',
        price: 85000,
        slot_duration_minutes: 240,
        slot_capacity: 15
      }
    ],

    service_opening_hours: [
      { service_id: 1, day_of_week: 1, opening_time: '12:00:00', closing_time: '23:00:00' },
      { service_id: 2, day_of_week: 1, opening_time: '00:00:00', closing_time: '23:59:00' },
      { service_id: 3, day_of_week: 1, opening_time: '09:00:00', closing_time: '21:00:00' },
      { service_id: 4, day_of_week: 1, opening_time: '06:00:00', closing_time: '11:00:00' },
      { service_id: 5, day_of_week: 1, opening_time: '08:00:00', closing_time: '19:00:00' }
    ],

    service_bookings: [
      { service_booking_id: 501, reservation_id: 1001, service_id: 1, booking_date: getRelativeDate(-1), start_time: '20:00', guests: 2 },
      { service_booking_id: 502, reservation_id: 1002, service_id: 2, booking_date: getRelativeDate(-1), start_time: '19:15', guests: 1 },
      { service_booking_id: 503, reservation_id: 1003, service_id: 3, booking_date: getRelativeDate(1), start_time: '16:30', guests: 2 },
      { service_booking_id: 504, reservation_id: 1001, service_id: 4, booking_date: getRelativeDate(0), start_time: '07:30', guests: 2 }
    ],

    invoices: [
      { invoice_id: 9001, reservation_id: 1001, issue_date: getRelativeDate(0), status: 'issued' },
      { invoice_id: 9002, reservation_id: 1002, issue_date: getRelativeDate(-1), status: 'issued' },
      { invoice_id: 9003, reservation_id: 1003, issue_date: getRelativeDate(0), status: 'draft' },
      { invoice_id: 9005, reservation_id: 1005, issue_date: getRelativeDate(-1), status: 'paid' }
    ],

    invoice_lines: [
      
      { invoice_line_id: 1, invoice_id: 9001, line_type: 'room', description: 'Chambre 101 - Confort Côté Jardin (4 nuits)', service_booking_id: null, quantity: 4, unit_price: 55000, tax_rate: 19.25 },
      { invoice_line_id: 2, invoice_id: 9001, line_type: 'service', description: 'Dîner Dégustation Ndolè Royal & Gambas (2 pers.)', service_booking_id: 501, quantity: 2, unit_price: 18500, tax_rate: 19.25 },
      { invoice_line_id: 3, invoice_id: 9001, line_type: 'service', description: 'Grand Buffet Petit-Déjeuner Camerounais (2 pers.)', service_booking_id: 504, quantity: 2, unit_price: 8500, tax_rate: 19.25 },

      { invoice_line_id: 4, invoice_id: 9002, line_type: 'room', description: 'Chambre 201 - Suite Junior Exécutive (4 nuits)', service_booking_id: null, quantity: 4, unit_price: 110000, tax_rate: 19.25 },
      { invoice_line_id: 5, invoice_id: 9002, line_type: 'service', description: 'Navette VIP Aéroport de Douala', service_booking_id: 502, quantity: 1, unit_price: 25000, tax_rate: 19.25 },

      { invoice_line_id: 6, invoice_id: 9003, line_type: 'room', description: 'Chambre 301 - Suite Prestige Wouri (4 nuits)', service_booking_id: null, quantity: 4, unit_price: 220000, tax_rate: 19.25 },
      { invoice_line_id: 7, invoice_id: 9003, line_type: 'service', description: 'Soin Relaxant aux Baumes Pur Karité (Duo)', service_booking_id: 503, quantity: 2, unit_price: 30000, tax_rate: 19.25 },

      { invoice_line_id: 8, invoice_id: 9005, line_type: 'room', description: 'Chambre 103 - Suite Familiale Baobab (3 nuits)', service_booking_id: null, quantity: 3, unit_price: 90000, tax_rate: 19.25 }
    ],

    payments: [
      { payment_id: 7001, invoice_id: 9005, payment_date: getRelativeDateTime(-1), amount: 321975, method: 'Orange Money (Réf: OM261102.8841)' }
    ],

    reviews: [
      {
        review_id: 801,
        reservation_id: 1005,
        rating: 5,
        comment: 'Accueil digne des grands palaces camerounais. Le personnel de réception à Bonanjo est d\'une politesse et d\'une serviabilité exemplaires. La chambre 103 était impeccable et la connexion fibre d\'une grande rapidité.',
        review_date: getRelativeDate(-1),
        author_name: 'Christian Tchouta'
      },
      {
        review_id: 802,
        reservation_id: 1001,
        rating: 5,
        comment: 'Un séjour de travail très productif. Le silence la nuit, le générateur automatique sans coupure et le petit-déjeuner avec les beignets chauds et les fruits de saison font toute la différence.',
        review_date: getRelativeDate(0),
        author_name: 'Pr. Jean-Paul Mbarga'
      },
      {
        review_id: 803,
        reservation_id: 1002,
        rating: 5,
        comment: 'Le chauffeur de la navette m\'attendait déjà à l\'aéroport de Douala malgré le léger retard du vol. Règlement de la facture ultra-simple par Orange Money d\'entreprise. Je recommande vivement pour les cadres en mission.',
        review_date: getRelativeDate(0),
        author_name: 'Aïssatou Bello'
      },
      {
        review_id: 804,
        reservation_id: 1003,
        rating: 5,
        comment: 'La vue sur le Wouri depuis la Suite 301 au coucher de soleil est tout simplement magique. Le Ndolè aux crevettes au restaurant était un régal absolu. Merci à toute l\'équipe pour l\'attention portée à notre anniversaire.',
        review_date: getRelativeDate(-2),
        author_name: 'Suzanne Mballa'
      },
      {
        review_id: 805,
        reservation_id: 1004,
        rating: 4,
        comment: 'Très belle infrastructure hôtelière. Cadre verdoyant et sécurisé. Prévoir éventuellement quelques options de thé vert au citron au bar pour les soirées de travail.',
        review_date: getRelativeDate(-4),
        author_name: 'Nadine Essomba'
      }
    ]
  };

  class HotelApp {
    constructor() {
      this.state = this.loadState();
      this.activeTab = 'dashboard';
      this.selectedFloor = 'all';
      this.selectedRoomStatus = 'all';
      this.reservationFilterStatus = 'all';
      this.invoiceFilterStatus = 'all';
      this.activeInspectingRoomId = null;

      this.init();
    }

    loadState() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          return JSON.parse(saved);
        }
      } catch (err) {
        console.warn('Erreur de lecture du localStorage, chargement des données par défaut:', err);
      }
      return JSON.parse(JSON.stringify(DEFAULT_DATA));
    }

    saveState() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      } catch (err) {
        console.error('Échec de la sauvegarde dans le stockage local:', err);
      }
    }

    resetState() {
      if (confirm('Voulez-vous réinitialiser toutes les données de l\'hôtel avec les données de démonstration du Cameroun ?')) {
        this.state = JSON.parse(JSON.stringify(DEFAULT_DATA));
        this.saveState();
        this.renderAll();
        this.showToast('Données réinitialisées avec succès aux standards de l\'hôtel.', 'info');
      }
    }

    init() {
      this.bindNav();
      this.bindSearch();
      this.bindClock();
      this.bindModals();
      this.bindFilters();
      this.renderAll();
    }

    bindNav() {
      const navButtons = document.querySelectorAll('.nav-item');
      navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const tab = btn.dataset.tab;
          this.switchTab(tab);
        });
      });

      document.getElementById('btnResetDemo').addEventListener('click', () => this.resetState());
      document.getElementById('btnOpenNewReservation').addEventListener('click', () => this.openNewReservationModal());
      document.getElementById('btnOpenNewGuest').addEventListener('click', () => this.openNewGuestModal());
      document.getElementById('btnOpenBookService').addEventListener('click', () => this.openBookServiceModal());
      document.getElementById('btnOpenAddReview').addEventListener('click', () => this.openAddReviewModal());
    }

    switchTab(tabName) {
      this.activeTab = tabName;

      document.querySelectorAll('.nav-item').forEach(b => {
        b.classList.toggle('active', b.dataset.tab === tabName);
      });

      document.querySelectorAll('.tab-view').forEach(v => {
        v.classList.toggle('active', v.id === `view-${tabName}`);
      });

      const titleEl = document.getElementById('pageTitle');
      const subEl = document.getElementById('pageSubtitle');
      const titles = {
        dashboard: { t: 'Main Courante & Réception', s: 'Flux en direct des clients, réservations du jour et suivi de l\'occupation.' },
        rooms: { t: 'Chambres & Pavillons', s: 'Plan des étages, disponibilité immédiate et état d\'entretien du parc.' },
        reservations: { t: 'Réservations & Séjours', s: 'Suivi rigoureux des arrivées, départs, fiches de police et séjours confirmés.' },
        guests: { t: 'Fichier Clients & VIP', s: 'Répertoire permanent des résidents, fidélité et préférences d\'hospitalité.' },
        services: { t: 'Restauration & Services', s: 'Gastronomie sawa, navettes aéroport, soins et salles de réunion.' },
        invoices: { t: 'Facturation & Règlements', s: 'Folios des résidents, TVA 19.25%, paiements Orange Money, MTN MoMo, Espèces.' },
        reviews: { t: 'Livre d\'Or & Avis Clients', s: 'Témoignages authentiques et appréciation de l\'hospitalité camerounaise.' }
      };

      if (titles[tabName]) {
        titleEl.textContent = titles[tabName].t;
        subEl.textContent = titles[tabName].s;
      }

      this.renderCurrentView();
    }

    renderCurrentView() {
      switch (this.activeTab) {
        case 'dashboard': this.renderDashboard(); break;
        case 'rooms': this.renderRooms(); break;
        case 'reservations': this.renderReservations(); break;
        case 'guests': this.renderGuests(); break;
        case 'services': this.renderServices(); break;
        case 'invoices': this.renderInvoices(); break;
        case 'reviews': this.renderReviews(); break;
      }
      this.updateBadges();
    }

    renderAll() {
      this.renderDashboard();
      this.renderRooms();
      this.renderReservations();
      this.renderGuests();
      this.renderServices();
      this.renderInvoices();
      this.renderReviews();
      this.updateBadges();
    }

    bindClock() {
      const updateClock = () => {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
        const dateStr = now.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' });
        const clockEl = document.getElementById('clockDisplay');
        if (clockEl) {
          clockEl.querySelector('.clock-time').textContent = timeStr + ' (WAT)';
          clockEl.querySelector('.clock-date').textContent = dateStr.toUpperCase() + ' • DOUALA';
        }
      };
      updateClock();
      setInterval(updateClock, 1000);
    }

    bindSearch() {
      const searchInput = document.getElementById('globalSearchInput');
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        this.handleGlobalSearch(query);
      });

      window.addEventListener('keydown', (e) => {
        if (e.key === '/' && document.activeElement !== searchInput && !document.querySelector('.modal-overlay.open')) {
          e.preventDefault();
          searchInput.focus();
        } else if (e.key === 'Escape') {
          this.closeAllModals();
        }
      });
    }

    handleGlobalSearch(query) {
      if (!query) {
        this.renderAll();
        return;
      }

      if (this.activeTab === 'dashboard') {
        this.switchTab('reservations');
      }

      if (this.activeTab === 'reservations') {
        const filtered = this.state.reservations.filter(res => {
          const client = this.getClient(res.client_id);
          const fullName = client ? `${client.first_name} ${client.last_name}`.toLowerCase() : '';
          return (
            res.reservation_id.toString().includes(query) ||
            fullName.includes(query) ||
            res.status.toLowerCase().includes(query)
          );
        });
        this.renderReservationsList(filtered);
      } else if (this.activeTab === 'guests') {
        const filtered = this.state.clients.filter(c => {
          const fullName = `${c.first_name} ${c.last_name}`.toLowerCase();
          return fullName.includes(query) || c.email.toLowerCase().includes(query) || c.phone.includes(query);
        });
        this.renderGuestsList(filtered);
      } else if (this.activeTab === 'rooms') {
        const filtered = this.state.rooms.filter(r => {
          const type = this.getRoomType(r.room_type_id);
          const typeName = type ? type.name.toLowerCase() : '';
          return r.room_number.includes(query) || typeName.includes(query);
        });
        this.renderRoomsList(filtered);
      }
    }

    bindFilters() {
      
      document.querySelectorAll('#floorFilters .pill-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('#floorFilters .pill-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.selectedFloor = btn.dataset.floor;
          this.renderRooms();
        });
      });

      document.querySelectorAll('#statusFilters .pill-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('#statusFilters .pill-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.selectedRoomStatus = btn.dataset.status;
          this.renderRooms();
        });
      });

      document.querySelectorAll('#reservationStatusTabs .subnav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('#reservationStatusTabs .subnav-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.reservationFilterStatus = btn.dataset.status;
          this.renderReservations();
        });
      });

      const guestFilterInput = document.getElementById('guestSearchInput');
      if (guestFilterInput) {
        guestFilterInput.addEventListener('input', (e) => {
          const q = e.target.value.toLowerCase().trim();
          const filtered = this.state.clients.filter(c => {
            const name = `${c.first_name} ${c.last_name}`.toLowerCase();
            return name.includes(q) || c.email.toLowerCase().includes(q) || c.phone.includes(q);
          });
          this.renderGuestsList(filtered);
        });
      }

      document.querySelectorAll('#invoiceStatusTabs .subnav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('#invoiceStatusTabs .subnav-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.invoiceFilterStatus = btn.dataset.status;
          this.renderInvoices();
        });
      });

      const checkInInput = document.getElementById('resCheckIn');
      const checkOutInput = document.getElementById('resCheckOut');
      const roomSelect = document.getElementById('resRoomSelect');

      const updateResPricing = () => {
        if (!checkInInput.value || !checkOutInput.value) return;
        const d1 = new Date(checkInInput.value);
        const d2 = new Date(checkOutInput.value);
        const diffTime = d2 - d1;
        const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
        const selectedRoomId = parseInt(roomSelect.value, 10);
        const room = this.state.rooms.find(r => r.room_id === selectedRoomId);
        const rate = room ? room.base_price_per_night : 0;
        const total = nights * rate;

        document.getElementById('calcNights').textContent = `${nights} nuitée${nights > 1 ? 's' : ''}`;
        document.getElementById('calcRate').textContent = `${formatFCFA(rate)} / nuit`;
        document.getElementById('calcTotal').textContent = formatFCFA(total);
      };

      if (checkInInput && checkOutInput && roomSelect) {
        checkInInput.addEventListener('change', updateResPricing);
        checkOutInput.addEventListener('change', updateResPricing);
        roomSelect.addEventListener('change', updateResPricing);
      }

      const starPicks = document.querySelectorAll('.star-pick');
      starPicks.forEach(star => {
        star.addEventListener('click', () => {
          const val = parseInt(star.dataset.val, 10);
          document.getElementById('reviewRatingVal').value = val;
          starPicks.forEach(s => {
            const sVal = parseInt(s.dataset.val, 10);
            s.classList.toggle('active', sVal <= val);
          });
        });
      });
    }

    updateBadges() {
      const availCount = this.state.rooms.filter(r => r.room_status_id === 1).length;
      const activeResCount = this.state.reservations.filter(r => r.status === 'confirmed' || r.status === 'checked_in').length;
      document.getElementById('availableRoomsBadge').textContent = availCount;
      document.getElementById('activeReservationsBadge').textContent = activeResCount;
    }

    renderDashboard() {
      const totalRooms = this.state.rooms.length;
      const occupiedRooms = this.state.rooms.filter(r => r.room_status_id === 2).length;
      const occupancyRate = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;

      const todayStr = getRelativeDate(0);
      const arrivalsToday = this.state.reservations.filter(r => r.check_in_date === todayStr && r.status !== 'cancelled').length;
      const departuresToday = this.state.reservations.filter(r => r.check_out_date === todayStr && r.status !== 'cancelled').length;
      const servicesCount = this.state.service_bookings.length;

      document.getElementById('statOccupancyRate').textContent = `${occupancyRate}%`;
      document.getElementById('statOccupancyDetail').textContent = `${occupiedRooms} sur ${totalRooms} chambres occupées`;
      document.getElementById('statTodayArrivals').textContent = arrivalsToday;
      document.getElementById('statTodayDepartures').textContent = departuresToday;
      document.getElementById('statActiveServices').textContent = servicesCount;

      const scheduleContainer = document.getElementById('todayScheduleList');
      scheduleContainer.innerHTML = '';

      const relevantRes = this.state.reservations.filter(r =>
        (r.check_in_date === todayStr || r.check_out_date === todayStr) && r.status !== 'cancelled'
      );

      if (relevantRes.length === 0) {
        scheduleContainer.innerHTML = `
          <div class="empty-state-card" style="padding: 24px; text-align: center; color: var(--text-muted);">
            <p>Aucune arrivée ou départ prévu pour ce jour.</p>
            <span style="font-size: 0.75rem;">Tous nos résidents actuels sont confortablement installés.</span>
          </div>
        `;
      } else {
        relevantRes.forEach(res => {
          const client = this.getClient(res.client_id);
          const roomObj = this.getReservationRoom(res.reservation_id);
          const isArrival = res.check_in_date === todayStr;

          const itemEl = document.createElement('div');
          itemEl.className = 'timeline-item';
          itemEl.innerHTML = `
            <div class="timeline-time-badge">
              <span class="time-type ${isArrival ? 'arrival' : 'departure'}">${isArrival ? 'Arrivée' : 'Départ'}</span>
              <span class="time-val">${isArrival ? '14:00' : '11:00'}</span>
            </div>
            <div class="timeline-guest-info">
              <div class="guest-name">
                ${client ? `${client.first_name} ${client.last_name}` : 'Client'}
                ${client && (client.vip_tier === 'Or' || client.vip_tier === 'Platine') ? `<span class="vip-badge">${client.vip_tier}</span>` : ''}
              </div>
              <div class="guest-meta">
                ${roomObj ? `Chambre ${roomObj.room_number}` : 'Chambre non attribuée'} • ${res.guest_count} Personne${res.guest_count > 1 ? 's' : ''} •
                <span class="status-pill status-${res.status}">${this.formatStatusFR(res.status)}</span>
              </div>
            </div>
            <div class="timeline-actions">
              ${isArrival && res.status === 'confirmed' ? `
                <button class="btn btn-sm btn-primary" onclick="app.checkInReservation(${res.reservation_id})">Enregistrer (Check-in)</button>
              ` : ''}
              ${res.status === 'checked_in' ? `
                <button class="btn btn-sm btn-outline" onclick="app.checkOutReservation(${res.reservation_id})">Libérer (Check-out)</button>
              ` : ''}
              <button class="btn btn-sm btn-outline" onclick="app.openInvoiceForReservation(${res.reservation_id})" title="Voir le Folio">Facture</button>
            </div>
          `;
          scheduleContainer.appendChild(itemEl);
        });
      }

      const matrixContainer = document.getElementById('roomQuickMatrix');
      matrixContainer.innerHTML = '';
      this.state.rooms.forEach(room => {
        const statusObj = this.getRoomStatus(room.room_status_id);
        const shortStatus = statusObj.name === 'Disponible' ? 'avail' : statusObj.name === 'Occupée' ? 'occ' : statusObj.name === 'Nettoyage' ? 'clean' : 'maint';

        const chip = document.createElement('div');
        chip.className = `room-chip ${shortStatus}`;
        chip.title = `Chambre ${room.room_number} • ${statusObj.name}`;
        chip.innerHTML = `
          <span class="room-chip-num">${room.room_number}</span>
          <span class="room-chip-status"></span>
        `;
        chip.onclick = () => this.openRoomDetailModal(room.room_id);
        matrixContainer.appendChild(chip);
      });

      const reviewBox = document.getElementById('dashboardRandomReview');
      if (this.state.reviews.length > 0 && reviewBox) {
        const randReview = this.state.reviews[Math.floor(Math.random() * this.state.reviews.length)];
        reviewBox.innerHTML = `
          <p class="quote-text">"${randReview.comment}"</p>
          <span class="quote-author">— ${randReview.author_name}</span>
        `;
      }
    }

    renderRooms() {
      let filtered = [...this.state.rooms];

      if (this.selectedFloor !== 'all') {
        const floorNum = parseInt(this.selectedFloor, 10);
        filtered = filtered.filter(r => r.floor === floorNum);
      }

      if (this.selectedRoomStatus !== 'all') {
        const statusMap = {
          'Available': 'Disponible',
          'Occupied': 'Occupée',
          'Cleaning': 'Nettoyage',
          'Maintenance': 'Maintenance',
          'Disponible': 'Disponible',
          'Occupée': 'Occupée',
          'Nettoyage': 'Nettoyage'
        };
        const targetName = statusMap[this.selectedRoomStatus] || this.selectedRoomStatus;
        const statusId = this.state.room_statuses.find(s => s.name === targetName)?.room_status_id;
        if (statusId) {
          filtered = filtered.filter(r => r.room_status_id === statusId);
        }
      }

      this.renderRoomsList(filtered);
    }

    renderRoomsList(rooms) {
      const grid = document.getElementById('roomsGrid');
      grid.innerHTML = '';

      if (rooms.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1/-1; padding: 40px; text-align: center; color: var(--text-muted);">Aucune chambre ne correspond à ce filtre.</div>`;
        return;
      }

      rooms.forEach(room => {
        const roomType = this.getRoomType(room.room_type_id);
        const roomStatus = this.getRoomStatus(room.room_status_id);
        const amenities = this.getRoomAmenities(room.room_id);
        const occupant = this.getRoomCurrentResident(room.room_id);

        const statusClass = roomStatus.name === 'Disponible' ? 'available' : roomStatus.name === 'Occupée' ? 'occupied' : roomStatus.name === 'Nettoyage' ? 'cleaning' : 'maintenance';

        const card = document.createElement('div');
        card.className = 'room-card';
        card.innerHTML = `
          <div class="room-card-header">
            <span class="room-num-badge">Chambre ${room.room_number}</span>
            <span class="status-pill status-${statusClass}">${roomStatus.name}</span>
          </div>
          <div class="room-card-body">
            <h3 class="room-type-name">${roomType ? roomType.name : 'Standard'}</h3>
            <span class="room-floor-tag">${room.floor === 1 ? '1er Étage (Côté Jardin)' : room.floor === 2 ? '2ème Étage (Terrasse)' : '3ème Étage (Vue Wouri)'} • Max ${room.max_capacity} pers.</span>

            <div class="room-amenities-row">
              ${amenities.slice(0, 4).map(a => `<span class="amenity-badge">${a.name}</span>`).join('')}
              ${amenities.length > 4 ? `<span class="amenity-badge">+${amenities.length - 4} autres</span>` : ''}
            </div>

            ${occupant ? `
              <div style="font-size: 0.76rem; background: var(--bg-canvas); padding: 8px; border-radius: 6px; margin-bottom: 12px; border: 1px solid var(--border-subtle);">
                <strong>Résident actuel :</strong> ${occupant.first_name} ${occupant.last_name} (${occupant.phone})
              </div>
            ` : ''}

            <div class="room-pricing-row">
              <div class="room-rate">
                <span class="rate-amount">${formatFCFA(room.base_price_per_night)}</span>
                <span class="rate-label">par nuitée (hors taxes)</span>
              </div>
              <div class="room-card-actions">
                <button class="btn btn-sm btn-outline" onclick="app.openRoomDetailModal(${room.room_id})">Détails</button>
                ${room.room_status_id === 1 ? `
                  <button class="btn btn-sm btn-primary" onclick="app.quickBookRoom(${room.room_id})">Réserver</button>
                ` : ''}
              </div>
            </div>
          </div>
        `;
        grid.appendChild(card);
      });
    }

    renderReservations() {
      let filtered = [...this.state.reservations];
      if (this.reservationFilterStatus !== 'all') {
        filtered = filtered.filter(r => r.status === this.reservationFilterStatus);
      }
      this.renderReservationsList(filtered);
    }

    renderReservationsList(reservations) {
      const tbody = document.getElementById('reservationsTableBody');
      tbody.innerHTML = '';

      if (reservations.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 32px; color: var(--text-muted);">Aucune réservation trouvée dans cette catégorie.</td></tr>`;
        return;
      }

      reservations.sort((a, b) => b.reservation_id - a.reservation_id);

      reservations.forEach(res => {
        const client = this.getClient(res.client_id);
        const room = this.getReservationRoom(res.reservation_id);
        const roomType = room ? this.getRoomType(room.room_type_id) : null;
        const total = this.calculateReservationTotal(res.reservation_id);

        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><strong>#RES-${res.reservation_id}</strong></td>
          <td>
            <div style="font-weight: 600;">${client ? `${client.first_name} ${client.last_name}` : 'Client Inconnu'}</div>
            <div style="font-size: 0.74rem; color: var(--text-muted);">${client ? client.phone : ''}</div>
          </td>
          <td>
            <div style="font-size: 0.82rem;">${res.check_in_date} &rarr; ${res.check_out_date}</div>
            <div style="font-size: 0.72rem; color: var(--text-muted);">${this.calculateNights(res.check_in_date, res.check_out_date)} nuitée(s)</div>
          </td>
          <td>
            <div>${room ? `Chambre ${room.room_number}` : 'Non assignée'}</div>
            <div style="font-size: 0.72rem; color: var(--text-muted);">${roomType ? roomType.name : ''}</div>
          </td>
          <td>${res.guest_count} pers.</td>
          <td><span class="status-pill status-${res.status}">${this.formatStatusFR(res.status)}</span></td>
          <td><strong>${formatFCFA(total)}</strong></td>
          <td class="text-right">
            <div style="display: inline-flex; gap: 6px;">
              ${res.status === 'confirmed' ? `
                <button class="btn btn-sm btn-primary" onclick="app.checkInReservation(${res.reservation_id})">Arrivée</button>
              ` : ''}
              ${res.status === 'checked_in' ? `
                <button class="btn btn-sm btn-outline" onclick="app.checkOutReservation(${res.reservation_id})">Départ</button>
              ` : ''}
              <button class="btn btn-sm btn-outline" onclick="app.openInvoiceForReservation(${res.reservation_id})" title="Voir le Folio">Facture</button>
              ${res.status === 'confirmed' ? `
                <button class="btn btn-sm btn-outline" style="color: #b91c1c;" title="Annuler le séjour" onclick="app.cancelReservation(${res.reservation_id})">&times;</button>
              ` : ''}
            </div>
          </td>
        `;
        tbody.appendChild(tr);
      });
    }

    renderGuests() {
      this.renderGuestsList(this.state.clients);
    }

    renderGuestsList(clients) {
      const grid = document.getElementById('guestsGrid');
      grid.innerHTML = '';

      if (clients.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1/-1; padding: 40px; text-align: center; color: var(--text-muted);">Aucun client enregistré.</div>`;
        return;
      }

      clients.forEach(c => {
        const staysCount = this.state.reservations.filter(r => r.client_id === c.client_id).length;
        const initials = `${c.first_name[0] || ''}${c.last_name[0] || ''}`.toUpperCase();

        const card = document.createElement('div');
        card.className = 'guest-card';
        card.innerHTML = `
          <div class="guest-card-header">
            <div class="guest-avatar-large">${initials}</div>
            <div>
              <h3 class="guest-card-name">${c.first_name} ${c.last_name}</h3>
              ${c.vip_tier ? `<span class="vip-badge">Statut ${c.vip_tier}</span>` : ''}
            </div>
          </div>
          <div class="guest-contact-list">
            <div class="guest-contact-item">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>${c.phone}</span>
            </div>
            <div class="guest-contact-item">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <span>${c.email}</span>
            </div>
            <div class="guest-contact-item">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
              <span>${staysCount} Séjour${staysCount > 1 ? 's' : ''} au Wouri</span>
            </div>
          </div>
          ${c.notes ? `<div class="guest-notes-box">"${c.notes}"</div>` : ''}
          <div style="margin-top: 14px; display: flex; justify-content: flex-end;">
            <button class="btn btn-sm btn-outline" onclick="app.openNewReservationForGuest(${c.client_id})">Nouvelle Réservation</button>
          </div>
        `;
        grid.appendChild(card);
      });
    }

    renderServices() {
      const grid = document.getElementById('servicesGrid');
      grid.innerHTML = '';

      this.state.services.forEach(s => {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.innerHTML = `
          <h3 class="service-title">${s.name}</h3>
          <p class="service-desc">${s.description}</p>
          <div class="service-meta-row">
            <span class="service-price">${formatFCFA(s.price)}</span>
            <span class="service-duration">${s.slot_duration_minutes} min • Capacité ${s.slot_capacity} pers.</span>
          </div>
          <button class="btn btn-outline btn-sm" onclick="app.openBookServiceModal(${s.service_id})">Commander pour un résident</button>
        `;
        grid.appendChild(card);
      });

      const tbody = document.getElementById('serviceBookingsTableBody');
      tbody.innerHTML = '';
      if (this.state.service_bookings.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 20px; color: var(--text-muted);">Aucune commande de service récente.</td></tr>`;
      } else {
        [...this.state.service_bookings].reverse().forEach(sb => {
          const service = this.state.services.find(s => s.service_id === sb.service_id);
          const res = this.state.reservations.find(r => r.reservation_id === sb.reservation_id);
          const client = res ? this.getClient(res.client_id) : null;
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>#CMD-${sb.service_booking_id}</td>
            <td><strong>${service ? service.name : 'Prestation Spéciale'}</strong></td>
            <td>${client ? `${client.first_name} ${client.last_name}` : 'Client'} (Séjour #${sb.reservation_id})</td>
            <td>${sb.booking_date} à ${sb.start_time}</td>
            <td>${sb.guests} pers.</td>
            <td>${service ? formatFCFA(service.price * sb.guests) : '0 FCFA'}</td>
            <td><span class="status-pill status-available">Confirmé</span></td>
          `;
          tbody.appendChild(tr);
        });
      }
    }

    renderInvoices() {
      let filtered = [...this.state.invoices];
      if (this.invoiceFilterStatus !== 'all') {
        filtered = filtered.filter(i => i.status === this.invoiceFilterStatus);
      }

      const tbody = document.getElementById('invoicesTableBody');
      tbody.innerHTML = '';

      if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 32px; color: var(--text-muted);">Aucune facture trouvée.</td></tr>`;
        return;
      }

      filtered.forEach(inv => {
        const res = this.state.reservations.find(r => r.reservation_id === inv.reservation_id);
        const client = res ? this.getClient(res.client_id) : null;
        const total = this.calculateInvoiceTotal(inv.invoice_id);
        const payments = this.getInvoicePayments(inv.invoice_id);
        const totalPaid = payments.reduce((acc, p) => acc + p.amount, 0);

        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><strong>#FACT-${inv.invoice_id}</strong></td>
          <td>#RES-${inv.reservation_id}</td>
          <td>${client ? `${client.first_name} ${client.last_name}` : 'Résident'}</td>
          <td>${inv.issue_date}</td>
          <td><span class="status-pill status-${inv.status}">${inv.status === 'paid' ? 'Payée' : inv.status === 'issued' ? 'Émise' : 'Brouillon'}</span></td>
          <td><strong>${formatFCFA(total)}</strong></td>
          <td>${totalPaid >= total && total > 0 ? `<span style="color: var(--brand-secondary); font-weight: 600;">${formatFCFA(totalPaid)} (Soldé)</span>` : formatFCFA(totalPaid)}</td>
          <td class="text-right">
            <button class="btn btn-sm btn-outline" onclick="app.openInvoiceModal(${inv.invoice_id})">Voir le Folio</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    }

    renderReviews() {
      const reviews = this.state.reviews;
      const count = reviews.length;
      let avg = 5.0;
      if (count > 0) {
        const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
        avg = (sum / count).toFixed(1);
      }

      document.getElementById('avgRatingDisplay').textContent = avg;
      document.getElementById('totalReviewsCount').textContent = `Sur ${count} avis clients vérifiés au Cameroun`;

      const barsContainer = document.getElementById('ratingBars');
      barsContainer.innerHTML = '';
      for (let star = 5; star >= 1; star--) {
        const matching = reviews.filter(r => r.rating === star).length;
        const pct = count > 0 ? (matching / count) * 100 : 0;
        const row = document.createElement('div');
        row.className = 'rating-bar-row';
        row.innerHTML = `
          <span class="rating-bar-label">${star} Étoiles</span>
          <div class="rating-bar-track">
            <div class="rating-bar-fill" style="width: ${pct}%"></div>
          </div>
          <span style="font-size: 0.74rem; color: var(--text-muted); width: 24px;">${matching}</span>
        `;
        barsContainer.appendChild(row);
      }

      const list = document.getElementById('reviewsList');
      list.innerHTML = '';
      [...reviews].reverse().forEach(r => {
        const starsText = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
        const card = document.createElement('div');
        card.className = 'review-card';
        card.innerHTML = `
          <div class="review-stars">${starsText}</div>
          <p class="review-text">"${r.comment}"</p>
          <div class="review-meta">
            <span class="review-author">${r.author_name}</span>
            <span class="review-date">${r.review_date}</span>
          </div>
        `;
        list.appendChild(card);
      });
    }

    bindModals() {
      document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
          if (e.target === overlay) {
            this.closeModal(overlay.id);
          }
        });
      });
    }

    openModal(id) {
      const modal = document.getElementById(id);
      if (modal) modal.classList.add('open');
    }

    closeModal(id) {
      const modal = document.getElementById(id);
      if (modal) modal.classList.remove('open');
    }

    closeAllModals() {
      document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
    }

    openNewReservationModal(presetGuestId = null, presetRoomId = null) {
      const guestSelect = document.getElementById('resGuestSelect');
      guestSelect.innerHTML = '';
      this.state.clients.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.client_id;
        opt.textContent = `${c.first_name} ${c.last_name} (${c.phone})`;
        if (presetGuestId && c.client_id === presetGuestId) opt.selected = true;
        guestSelect.appendChild(opt);
      });

      const checkInInput = document.getElementById('resCheckIn');
      const checkOutInput = document.getElementById('resCheckOut');
      checkInInput.value = getRelativeDate(0);
      checkOutInput.value = getRelativeDate(2);

      const roomSelect = document.getElementById('resRoomSelect');
      roomSelect.innerHTML = '';
      this.state.rooms.forEach(r => {
        const type = this.getRoomType(r.room_type_id);
        const opt = document.createElement('option');
        opt.value = r.room_id;
        opt.textContent = `Chambre ${r.room_number} - ${type ? type.name : ''} (${formatFCFA(r.base_price_per_night)}/nuit)`;
        if (presetRoomId && r.room_id === presetRoomId) opt.selected = true;
        roomSelect.appendChild(opt);
      });

      roomSelect.dispatchEvent(new Event('change'));
      this.openModal('modalNewReservation');
    }

    quickBookRoom(roomId) {
      this.openNewReservationModal(null, roomId);
    }

    openNewReservationForGuest(guestId) {
      this.openNewReservationModal(guestId, null);
    }

    handleCreateReservation(event) {
      event.preventDefault();

      const clientId = parseInt(document.getElementById('resGuestSelect').value, 10);
      const checkIn = document.getElementById('resCheckIn').value;
      const checkOut = document.getElementById('resCheckOut').value;
      const roomId = parseInt(document.getElementById('resRoomSelect').value, 10);
      const guestCount = parseInt(document.getElementById('resGuestCount').value, 10);
      const specialNotes = document.getElementById('resSpecialNotes').value;

      if (!checkIn || !checkOut || checkIn >= checkOut) {
        alert('La date de départ doit être strictement postérieure à la date d\'arrivée.');
        return;
      }

      const room = this.state.rooms.find(r => r.room_id === roomId);
      if (!room) return;

      const newResId = (Math.max(0, ...this.state.reservations.map(r => r.reservation_id)) || 1000) + 1;

      const newRes = {
        reservation_id: newResId,
        client_id: clientId,
        check_in_date: checkIn,
        check_out_date: checkOut,
        guest_count: guestCount,
        status: 'confirmed',
        created_at: new Date().toISOString().replace('T', ' ').substring(0, 19),
        cancelled_at: null,
        special_requests: specialNotes
      };
      this.state.reservations.push(newRes);

      this.state.reservation_rooms.push({
        reservation_id: newResId,
        room_id: roomId,
        nightly_price: room.base_price_per_night
      });

      const newInvId = (Math.max(0, ...this.state.invoices.map(i => i.invoice_id)) || 9000) + 1;
      const nights = this.calculateNights(checkIn, checkOut);
      const roomType = this.getRoomType(room.room_type_id);

      this.state.invoices.push({
        invoice_id: newInvId,
        reservation_id: newResId,
        issue_date: getRelativeDate(0),
        status: 'issued'
      });

      const nextLineId = (Math.max(0, ...this.state.invoice_lines.map(l => l.invoice_line_id)) || 0) + 1;
      this.state.invoice_lines.push({
        invoice_line_id: nextLineId,
        invoice_id: newInvId,
        line_type: 'room',
        description: `Hébergement Chambre ${room.room_number} - ${roomType ? roomType.name : 'Séjour'} (${nights} nuitées)`,
        service_booking_id: null,
        quantity: nights,
        unit_price: room.base_price_per_night,
        tax_rate: 19.25
      });

      this.saveState();
      this.closeModal('modalNewReservation');
      this.renderAll();

      const client = this.getClient(clientId);
      this.showToast(`Réservation #RES-${newResId} confirmée pour ${client ? client.first_name + ' ' + client.last_name : 'le résident'} !`, 'success');
    }

    openNewGuestModal(prefillIntoRes = false) {
      document.getElementById('formNewGuest').reset();
      this.prefillIntoResAfterCreate = prefillIntoRes;
      this.openModal('modalNewGuest');
    }

    handleCreateGuest(event) {
      event.preventDefault();
      const first = document.getElementById('guestFirstName').value.trim();
      const last = document.getElementById('guestLastName').value.trim();
      const email = document.getElementById('guestEmail').value.trim();
      const phone = document.getElementById('guestPhone').value.trim();
      const prefs = document.getElementById('guestPreferences').value.trim();

      const newId = (Math.max(0, ...this.state.clients.map(c => c.client_id)) || 0) + 1;
      const newClient = {
        client_id: newId,
        first_name: first,
        last_name: last,
        email: email,
        phone: phone,
        vip_tier: 'Standard',
        notes: prefs
      };

      this.state.clients.push(newClient);
      this.saveState();
      this.closeModal('modalNewGuest');
      this.renderAll();

      this.showToast(`Nouveau client enregistré : ${first} ${last}.`, 'success');

      if (this.prefillIntoResAfterCreate) {
        this.openNewReservationModal(newId);
      }
    }

    openRoomDetailModal(roomId) {
      const room = this.state.rooms.find(r => r.room_id === roomId);
      if (!room) return;

      this.activeInspectingRoomId = roomId;
      const roomType = this.getRoomType(room.room_type_id);
      const roomStatus = this.getRoomStatus(room.room_status_id);
      const amenities = this.getRoomAmenities(roomId);
      const occupant = this.getRoomCurrentResident(roomId);

      document.getElementById('roomDetailTitle').textContent = `Chambre ${room.room_number}`;
      document.getElementById('roomDetailSubtitle').textContent = `${roomType ? roomType.name : ''} • Étage ${room.floor}`;
      document.getElementById('roomDetailPrice').textContent = formatFCFA(room.base_price_per_night);
      document.getElementById('roomDetailCapacity').textContent = `${room.max_capacity} Personnes max`;

      const statusPill = document.getElementById('roomDetailStatusPill');
      statusPill.textContent = roomStatus.name;
      const sClass = roomStatus.name === 'Disponible' ? 'available' : roomStatus.name === 'Occupée' ? 'occupied' : roomStatus.name === 'Nettoyage' ? 'cleaning' : 'maintenance';
      statusPill.className = `val status-pill status-${sClass}`;

      const amenBox = document.getElementById('roomDetailAmenities');
      amenBox.innerHTML = amenities.map(a => `<span class="amenity-badge">${a.name}</span>`).join('');

      const occBlock = document.getElementById('roomDetailOccupantBlock');
      if (occupant) {
        occBlock.innerHTML = `
          <div style="background: var(--bg-canvas); padding: 12px; border-radius: 6px; border: 1px solid var(--border-subtle);">
            <strong style="color: var(--brand-primary);">Occupant actuel :</strong>
            <div>${occupant.first_name} ${occupant.last_name} (${occupant.phone})</div>
            <div style="font-size: 0.74rem; color: var(--text-muted);">${occupant.notes || 'Aucune note particulière'}</div>
          </div>
        `;
      } else {
        occBlock.innerHTML = `<p style="font-size: 0.78rem; color: var(--text-muted);">Aucun client n'occupe cette chambre actuellement.</p>`;
      }

      this.openModal('modalRoomDetail');
    }

    updateRoomStatus(newStatusName) {
      if (!this.activeInspectingRoomId) return;
      const room = this.state.rooms.find(r => r.room_id === this.activeInspectingRoomId);
      const statusMap = {
        'Available': 'Disponible',
        'Occupied': 'Occupée',
        'Cleaning': 'Nettoyage',
        'Maintenance': 'Maintenance'
      };
      const actualName = statusMap[newStatusName] || newStatusName;
      const statusObj = this.state.room_statuses.find(s => s.name === actualName);
      if (!room || !statusObj) return;

      room.room_status_id = statusObj.room_status_id;
      this.saveState();
      this.renderAll();
      this.openRoomDetailModal(room.room_id);
      this.showToast(`Statut de la Chambre ${room.room_number} passé à : ${actualName}.`, 'info');
    }

    bookSpecificRoom() {
      if (!this.activeInspectingRoomId) return;
      const rId = this.activeInspectingRoomId;
      this.closeModal('modalRoomDetail');
      this.quickBookRoom(rId);
    }

    openBookServiceModal(presetServiceId = null) {
      const sSelect = document.getElementById('serviceSelect');
      sSelect.innerHTML = '';
      this.state.services.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s.service_id;
        opt.textContent = `${s.name} (${formatFCFA(s.price)})`;
        if (presetServiceId && s.service_id === presetServiceId) opt.selected = true;
        sSelect.appendChild(opt);
      });

      const resSelect = document.getElementById('serviceReservationSelect');
      resSelect.innerHTML = '';
      const activeRes = this.state.reservations.filter(r => r.status === 'checked_in' || r.status === 'confirmed');

      if (activeRes.length === 0) {
        resSelect.innerHTML = `<option disabled selected>Aucun séjour en cours</option>`;
      } else {
        activeRes.forEach(r => {
          const client = this.getClient(r.client_id);
          const room = this.getReservationRoom(r.reservation_id);
          const opt = document.createElement('option');
          opt.value = r.reservation_id;
          opt.textContent = `Séjour #RES-${r.reservation_id} • ${client ? client.first_name + ' ' + client.last_name : 'Client'} (${room ? 'Chambre ' + room.room_number : 'Non assignée'})`;
          resSelect.appendChild(opt);
        });
      }

      document.getElementById('serviceDate').value = getRelativeDate(0);
      this.updateServicePricePreview();
      this.openModal('modalBookService');
    }

    updateServicePricePreview() {
      const sId = parseInt(document.getElementById('serviceSelect').value, 10);
      const s = this.state.services.find(item => item.service_id === sId);
      const previewEl = document.getElementById('servicePricePreview');
      if (s && previewEl) {
        previewEl.textContent = `${formatFCFA(s.price)} / pers.`;
      }
    }

    handleCreateServiceBooking(event) {
      event.preventDefault();
      const serviceId = parseInt(document.getElementById('serviceSelect').value, 10);
      const resId = parseInt(document.getElementById('serviceReservationSelect').value, 10);
      const dateVal = document.getElementById('serviceDate').value;
      const timeVal = document.getElementById('serviceTime').value;
      const guests = parseInt(document.getElementById('serviceGuests').value, 10);

      const service = this.state.services.find(s => s.service_id === serviceId);
      if (!service || isNaN(resId)) {
        alert('Veuillez sélectionner un séjour actif et une prestation.');
        return;
      }

      const newBookingId = (Math.max(0, ...this.state.service_bookings.map(b => b.service_booking_id)) || 500) + 1;
      const newBooking = {
        service_booking_id: newBookingId,
        reservation_id: resId,
        service_id: serviceId,
        booking_date: dateVal,
        start_time: timeVal,
        guests: guests
      };

      this.state.service_bookings.push(newBooking);

      let invoice = this.state.invoices.find(i => i.reservation_id === resId && i.status !== 'paid');
      if (!invoice) {
        const newInvId = (Math.max(0, ...this.state.invoices.map(i => i.invoice_id)) || 9000) + 1;
        invoice = {
          invoice_id: newInvId,
          reservation_id: resId,
          issue_date: dateVal,
          status: 'issued'
        };
        this.state.invoices.push(invoice);
      }

      const nextLineId = (Math.max(0, ...this.state.invoice_lines.map(l => l.invoice_line_id)) || 0) + 1;
      this.state.invoice_lines.push({
        invoice_line_id: nextLineId,
        invoice_id: invoice.invoice_id,
        line_type: 'service',
        description: `${service.name} (${guests} personne${guests > 1 ? 's' : ''})`,
        service_booking_id: newBookingId,
        quantity: guests,
        unit_price: service.price,
        tax_rate: 19.25
      });

      this.saveState();
      this.closeModal('modalBookService');
      this.renderAll();
      this.showToast(`${service.name} ajouté à la facture #FACT-${invoice.invoice_id}.`, 'success');
    }

    openInvoiceForReservation(reservationId) {
      let inv = this.state.invoices.find(i => i.reservation_id === reservationId);
      if (!inv) {
        const newInvId = (Math.max(0, ...this.state.invoices.map(i => i.invoice_id)) || 9000) + 1;
        inv = {
          invoice_id: newInvId,
          reservation_id: reservationId,
          issue_date: getRelativeDate(0),
          status: 'issued'
        };
        this.state.invoices.push(inv);
        this.saveState();
      }
      this.openInvoiceModal(inv.invoice_id);
    }

    openInvoiceModal(invoiceId) {
      const inv = this.state.invoices.find(i => i.invoice_id === invoiceId);
      if (!inv) return;

      const res = this.state.reservations.find(r => r.reservation_id === inv.reservation_id);
      const client = res ? this.getClient(res.client_id) : null;
      const room = res ? this.getReservationRoom(res.reservation_id) : null;
      const lines = this.state.invoice_lines.filter(l => l.invoice_id === invoiceId);
      const payments = this.getInvoicePayments(invoiceId);

      const subtotal = lines.reduce((acc, l) => acc + (l.quantity * l.unit_price), 0);
      const tax = lines.reduce((acc, l) => acc + (l.quantity * l.unit_price * (l.tax_rate / 100)), 0);
      const grandTotal = subtotal + tax;
      const totalPaid = payments.reduce((acc, p) => acc + p.amount, 0);
      const balanceDue = Math.max(0, grandTotal - totalPaid);

      const container = document.getElementById('invoicePrintArea');
      container.innerHTML = `
        <div class="invoice-header-box">
          <div>
            <div class="folio-brand-title">HÔTEL LE WOURI PRESTIGE & SUITES</div>
            <div class="folio-brand-meta">
              Boulevard de la Liberté, Bonanjo - B.P. 1248 Douala, Cameroun<br>
              Tél: +237 233 42 10 50 / +237 699 00 00 12 • Email: reception@hotel-wouri.cm<br>
              N.I.F : M051812749210B • R.C.C.M : RC/DLA/2018/B/452
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 1.15rem; font-weight: 700; color: var(--text-main);">NOTE D'HÔTEL / FOLIO</div>
            <div style="font-size: 0.85rem; color: var(--text-secondary);">Facture N° : FACT-${inv.invoice_id}</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">Date d'émission : ${inv.issue_date}</div>
            <div style="margin-top: 4px;"><span class="status-pill status-${inv.status}">${inv.status === 'paid' ? 'Payée' : inv.status === 'issued' ? 'Émise' : 'Brouillon'}</span></div>
          </div>
        </div>

        <div class="folio-details-grid">
          <div>
            <div class="folio-section-title">Client Facturé</div>
            <strong>${client ? `${client.first_name} ${client.last_name}` : 'Résident'}</strong>
            <div style="color: var(--text-secondary); font-size: 0.8rem;">
              Téléphone : ${client ? client.phone : ''}<br>
              Email : ${client ? client.email : ''}
            </div>
          </div>
          <div>
            <div class="folio-section-title">Détails du Séjour</div>
            <div style="font-size: 0.82rem; color: var(--text-secondary);">
              <strong>Dossier Réservation :</strong> #RES-${res ? res.reservation_id : 'N/A'}<br>
              <strong>Dates du séjour :</strong> ${res ? `du ${res.check_in_date} au ${res.check_out_date}` : 'N/A'}<br>
              <strong>Attribution :</strong> ${room ? `Chambre ${room.room_number}` : 'Non attribuée'}
            </div>
          </div>
        </div>

        <table class="folio-lines-table">
          <thead>
            <tr>
              <th>Désignation des Prestations</th>
              <th style="text-align: center;">Qté</th>
              <th style="text-align: right;">Prix Unitaire</th>
              <th style="text-align: right;">TVA (19.25%)</th>
              <th style="text-align: right;">Total HT</th>
            </tr>
          </thead>
          <tbody>
            ${lines.length === 0 ? `
              <tr><td colspan="5" style="text-align:center; padding: 16px; color: var(--text-muted);">Aucune ligne enregistrée sur cette facture.</td></tr>
            ` : lines.map(l => `
              <tr>
                <td>${l.description}</td>
                <td style="text-align: center;">${l.quantity}</td>
                <td style="text-align: right;">${formatFCFA(l.unit_price)}</td>
                <td style="text-align: right;">${l.tax_rate}%</td>
                <td style="text-align: right; font-weight: 600;">${formatFCFA(l.quantity * l.unit_price)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div style="display: flex; justify-content: space-between; align-items: flex-end;">
          <div style="font-size: 0.76rem; color: var(--text-muted); max-width: 340px;">
            Hôtel Le Wouri Prestige vous remercie de votre confiance. Les paiements électroniques par <strong>Orange Money</strong> (#150*...), <strong>MTN Mobile Money</strong> (*126#) et Cartes Bancaires sont acceptés à la réception.
          </div>
          <div class="folio-totals-box">
            <div style="display:flex; justify-content:space-between; font-size:0.8rem;">
              <span>Total Hors Taxes :</span> <strong>${formatFCFA(subtotal)}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:0.8rem;">
              <span>TVA Cameroun (19.25%) :</span> <strong>${formatFCFA(tax)}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:1.05rem; font-weight:700; color:var(--brand-primary); border-top:1px dashed #d4ccbf; padding-top:6px; margin-top:4px;">
              <span>Total TTC :</span> <span>${formatFCFA(grandTotal)}</span>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:0.82rem; color:var(--brand-secondary); margin-top:2px;">
              <span>Acomptes / Règlements :</span> <strong>-${formatFCFA(totalPaid)}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:0.95rem; font-weight:700; color: ${balanceDue > 0 ? '#b91c1c' : '#2d6a4f'}; border-top:1px solid #d4ccbf; padding-top:4px;">
              <span>Net à payer :</span> <span>${formatFCFA(balanceDue)}</span>
            </div>
          </div>
        </div>
      `;

      const footer = document.getElementById('invoiceModalFooter');
      footer.innerHTML = `
        <button type="button" class="btn btn-outline" onclick="app.closeModal('modalInvoice')">Fermer</button>
        ${balanceDue > 0 ? `
          <div style="display:flex; gap:8px;">
            <button type="button" class="btn btn-primary" style="background:#e05b00;" onclick="app.recordPaymentPrompt(${inv.invoice_id}, ${balanceDue}, 'Orange Money')">
              Régler Orange Money
            </button>
            <button type="button" class="btn btn-primary" style="background:#fdb813; color:#000;" onclick="app.recordPaymentPrompt(${inv.invoice_id}, ${balanceDue}, 'MTN MoMo')">
              Régler MTN MoMo
            </button>
            <button type="button" class="btn btn-primary" onclick="app.recordPaymentPrompt(${inv.invoice_id}, ${balanceDue}, 'Espèces')">
              Encaisser Espèces
            </button>
          </div>
        ` : `
          <span style="color: var(--brand-secondary); font-size: 0.85rem; font-weight: 600;">✓ Facture Intégralement Soldée</span>
        `}
      `;

      this.openModal('modalInvoice');
    }

    recordPaymentPrompt(invoiceId, amount, defaultMethod) {
      const ref = prompt(`Saisir la référence ou le numéro de transaction pour le paiement (${defaultMethod}) :`, `${defaultMethod} - Réf: CM-${Date.now().toString().slice(-6)}`);
      if (ref === null) return;

      const newPayId = (Math.max(0, ...this.state.payments.map(p => p.payment_id)) || 7000) + 1;
      this.state.payments.push({
        payment_id: newPayId,
        invoice_id: invoiceId,
        payment_date: new Date().toISOString().replace('T', ' ').substring(0, 19),
        amount: amount,
        method: ref
      });

      const inv = this.state.invoices.find(i => i.invoice_id === invoiceId);
      if (inv) inv.status = 'paid';

      this.saveState();
      this.renderAll();
      this.openInvoiceModal(invoiceId);
      this.showToast(`Règlement de ${formatFCFA(amount)} enregistré avec succès !`, 'success');
    }

    openAddReviewModal() {
      const select = document.getElementById('reviewReservationSelect');
      select.innerHTML = '';

      this.state.reservations.forEach(r => {
        const client = this.getClient(r.client_id);
        const opt = document.createElement('option');
        opt.value = r.reservation_id;
        opt.textContent = `Séjour #RES-${r.reservation_id} • ${client ? `${client.first_name} ${client.last_name}` : 'Client'}`;
        select.appendChild(opt);
      });

      document.getElementById('formAddReview').reset();
      document.getElementById('reviewRatingVal').value = 5;
      document.querySelectorAll('.star-pick').forEach(s => s.classList.add('active'));

      this.openModal('modalAddReview');
    }

    handleCreateReview(event) {
      event.preventDefault();
      const resId = parseInt(document.getElementById('reviewReservationSelect').value, 10);
      const rating = parseInt(document.getElementById('reviewRatingVal').value, 10);
      const comment = document.getElementById('reviewComment').value.trim();

      const res = this.state.reservations.find(r => r.reservation_id === resId);
      const client = res ? this.getClient(res.client_id) : null;
      const authorName = client ? `${client.first_name} ${client.last_name}` : 'Client Résident';

      const newRevId = (Math.max(0, ...this.state.reviews.map(r => r.review_id)) || 800) + 1;
      this.state.reviews.push({
        review_id: newRevId,
        reservation_id: resId,
        rating: rating,
        comment: comment,
        review_date: getRelativeDate(0),
        author_name: authorName
      });

      this.saveState();
      this.closeModal('modalAddReview');
      this.renderAll();
      this.showToast('Témoignage client consigné dans le Livre d\'Or.', 'success');
    }

    checkInReservation(reservationId) {
      const res = this.state.reservations.find(r => r.reservation_id === reservationId);
      if (!res) return;

      res.status = 'checked_in';
      const rr = this.state.reservation_rooms.find(x => x.reservation_id === reservationId);
      if (rr) {
        const room = this.state.rooms.find(r => r.room_id === rr.room_id);
        if (room) room.room_status_id = 2; 
      }

      this.saveState();
      this.renderAll();
      const client = this.getClient(res.client_id);
      this.showToast(`Arrivée enregistrée pour ${client ? client.first_name + ' ' + client.last_name : 'le résident'} ! Clé magnétique remise.`, 'success');
    }

    checkOutReservation(reservationId) {
      const res = this.state.reservations.find(r => r.reservation_id === reservationId);
      if (!res) return;

      res.status = 'checked_out';
      const rr = this.state.reservation_rooms.find(x => x.reservation_id === reservationId);
      if (rr) {
        const room = this.state.rooms.find(r => r.room_id === rr.room_id);
        if (room) room.room_status_id = 3; 
      }

      this.saveState();
      this.renderAll();
      const client = this.getClient(res.client_id);
      this.showToast(`Départ enregistré pour ${client ? client.first_name : 'le résident'}. Chambre transmise au service d'étages.`, 'info');
    }

    cancelReservation(reservationId) {
      if (!confirm(`Confirmez-vous l'annulation de la réservation #RES-${reservationId} ?`)) return;
      const res = this.state.reservations.find(r => r.reservation_id === reservationId);
      if (!res) return;

      res.status = 'cancelled';
      res.cancelled_at = new Date().toISOString().replace('T', ' ').substring(0, 19);

      this.saveState();
      this.renderAll();
      this.showToast(`Réservation #RES-${reservationId} annulée.`, 'info');
    }

    showToast(message, type = 'info') {
      const container = document.getElementById('toastContainer');
      if (!container) return;

      const toast = document.createElement('div');
      toast.className = `toast ${type}`;
      toast.innerHTML = `
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
          ${type === 'success' ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>' : '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>'}
        </svg>
        <span>${message}</span>
      `;
      container.appendChild(toast);

      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(8px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
      }, 4000);
    }

    formatStatusFR(status) {
      const map = {
        'confirmed': 'Confirmée',
        'checked_in': 'En séjour',
        'checked_out': 'Séjour clôturé',
        'cancelled': 'Annulée'
      };
      return map[status] || status;
    }

    getClient(clientId) {
      return this.state.clients.find(c => c.client_id === clientId);
    }

    getRoomType(typeId) {
      return this.state.room_types.find(t => t.room_type_id === typeId);
    }

    getRoomStatus(statusId) {
      return this.state.room_statuses.find(s => s.room_status_id === statusId) || { name: 'Inconnu' };
    }

    getRoomAmenities(roomId) {
      const linkIds = this.state.room_amenities.filter(ra => ra.room_id === roomId).map(ra => ra.amenity_id);
      return this.state.amenities.filter(a => linkIds.includes(a.amenity_id));
    }

    getReservationRoom(reservationId) {
      const rr = this.state.reservation_rooms.find(x => x.reservation_id === reservationId);
      if (!rr) return null;
      return this.state.rooms.find(r => r.room_id === rr.room_id);
    }

    getRoomCurrentResident(roomId) {
      const rr = this.state.reservation_rooms.find(x => x.room_id === roomId);
      if (!rr) return null;
      const res = this.state.reservations.find(r => r.reservation_id === rr.reservation_id && r.status === 'checked_in');
      if (!res) return null;
      return this.getClient(res.client_id);
    }

    getInvoicePayments(invoiceId) {
      return this.state.payments.filter(p => p.invoice_id === invoiceId);
    }

    calculateNights(d1, d2) {
      const diff = new Date(d2) - new Date(d1);
      return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    }

    calculateReservationTotal(reservationId) {
      const inv = this.state.invoices.find(i => i.reservation_id === reservationId);
      if (inv) {
        return this.calculateInvoiceTotal(inv.invoice_id);
      }
      const res = this.state.reservations.find(r => r.reservation_id === reservationId);
      const rr = this.state.reservation_rooms.find(r => r.reservation_id === reservationId);
      if (!res || !rr) return 0;
      const nights = this.calculateNights(res.check_in_date, res.check_out_date);
      return Math.round(nights * rr.nightly_price * 1.1925);
    }

    calculateInvoiceTotal(invoiceId) {
      const lines = this.state.invoice_lines.filter(l => l.invoice_id === invoiceId);
      return lines.reduce((acc, l) => {
        const lineVal = l.quantity * l.unit_price;
        const taxVal = lineVal * (l.tax_rate / 100);
        return acc + lineVal + taxVal;
      }, 0);
    }
  }

  window.app = new HotelApp();
})();
