import React, { useState, useRef, useEffect } from 'react';
import { 
  Text, View, TextInput, TouchableOpacity, 
  Keyboard, BackHandler, Platform, Modal, ScrollView, Alert 
} from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

import { styles } from './style';
import { categories, SUPPORTED_SITES, accentPresets, themes } from './constant';

// TODO: ADDRESS
// import { addrchangeURL, sendAddressChangeReq } from './addressHelper';

function MainAppContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');

  // TODO: ADDRESS
  // const [delieveryAddress, setDelieveryAddress] = useState('');
  // const [submittedAddress, setSubmittedAddress] = useState('');
  // const [sitesWithUpdatedAddress, setSitesWithUpdatedAddress] = useState({});

  const [activePlatform, setActivePlatform] = useState('blinkit');
  
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [themeMode, setThemeMode] = useState('dark');
  const [accentColor, setAccentColor] = useState('#34c759');

  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const [activeSites, setActiveSites] = useState(() => 
    SUPPORTED_SITES.reduce((acc, site) => ({ ...acc, [site.id]: true }), {})
  );


  // Manually hadnleing of back button
  const [navStates, setNavStates] = useState(() => 
    SUPPORTED_SITES.reduce((acc, site) => ({ ...acc, [site.id]: { canGoBack: false } }), {})
  );

  const refs = useRef({});
  SUPPORTED_SITES.forEach(site => {
    if (!refs.current[site.id]) {
      refs.current[site.id] = React.createRef();
    }
  });

  const activeTheme = themes[themeMode];

  //Back button hnadling:
  //  If settings is open => close it
  //  If active site can go back => go back
  //  Else ask for confirmatioin to leave

  //This useeffect both defibes AND uses the function
  //This is a good pattern, if the functioin is non-reuseable (Saw somewhere)
  useEffect(() => {
    const handleHardwareBackPress = () => {
      if (isSettingsOpen) {
        setIsSettingsOpen(false);
        return true;
      }
      if (isInfoOpen) {
        setIsInfoOpen(false);
        return true;
      }

      const currentActiveWebView = refs.current[activePlatform]?.current;
      const currentCanGoBack = navStates[activePlatform]?.canGoBack;

      if (currentActiveWebView && currentCanGoBack) {
        currentActiveWebView.goBack();
        return true; 
      }

      Alert.alert(
        'Exit App',
        'Are you sure you want to exit the comparison app?',
        [
          { text: 'Cancel', style: 'cancel', onPress: () => {} },
          { text: 'Exit', style: 'destructive', onPress: () => BackHandler.exitApp() }
        ]
      );
      return true;
    };
    const backHandlerSubscription = BackHandler.addEventListener(
      'hardwareBackPress',
      handleHardwareBackPress
    );
    return () => backHandlerSubscription.remove();
  }, [activePlatform, navStates, isSettingsOpen]);

  // TODO: ADDRESS
  // useEffect(() => {
  //   if (!submittedQuery) return;

  //   SUPPORTED_SITES.forEach((site) => {
  //     if (
  //       activeSites[site.id] &&
  //       !sitesWithUpdatedAddress[site.id] &&
  //       refs.current[site.id]?.current
  //     ) {
  //       sendAddressChangeReq(site.id, refs.current[site.id]);

  //       setSitesWithUpdatedAddress((prev) => ({
  //         ...prev,
  //         [site.id]: true,
  //       }));
  //     }
  //   });
  // }, [submittedQuery, activeSites, sitesWithUpdatedAddress, submittedAddress]);

  //If I disabled the activeSite, switc the active site to the first valid site
  useEffect(() => {
    if (!activeSites[activePlatform]) {
      const remaining = SUPPORTED_SITES.find(site => activeSites[site.id]);
      if (remaining) setActivePlatform(remaining.id);
    }
  }, [activeSites]);

  const handleSearchExecute = () => {
    Keyboard.dismiss();
    if (!searchQuery.trim()) return;
    setSubmittedQuery(searchQuery);
  };

  // TODO: ADDRESS
  // const handleDelieveryAddressChange = () => {
  //   Keyboard.dismiss();
  //   if (!delieveryAddress.trim()) return;
  //   setSubmittedAddress(delieveryAddress);
  //   setSitesWithUpdatedAddress({}); //Forcefully make ALL* sites to change addresses
  // };

  const updateNavState = (platform, navState) => {
    setNavStates(prev => ({ ...prev, [platform]: { canGoBack: navState.canGoBack } }));
  };

  //So freaking simple. Resolves the bottom button overlay (Also the notch and stuffs)
  const insets = useSafeAreaInsets();

  const instantSites = SUPPORTED_SITES.filter(s => s.type === 'Instant' && activeSites[s.id]);
  const standardSites = SUPPORTED_SITES.filter(s => s.type === 'Standard' && activeSites[s.id]);
  const fallbackSites = SUPPORTED_SITES.filter(s => s.type === 'Fallback' && activeSites[s.id]);

  const selectCategories = (category) => {
    setSelectedCategory(category);
    
    const updatedSites = {};
    SUPPORTED_SITES.forEach(site => {
      updatedSites[site.id] = site.category.includes(category);
    });
    
    setActiveSites(updatedSites);
  };

  return (
    <View style={[styles.appContainer, { backgroundColor: activeTheme.bg }]}>
      <View style={[styles.controlHub, { paddingTop: Math.max(insets.top, 10), backgroundColor: activeTheme.card, borderBottomColor: activeTheme.border }]}>

        {/* TODO: One click address change */}
        {/* // TODO: ADDRESS */}
        {/*
          <View style={styles.searchRow}>
            <TextInput 
              style={[styles.searchBox, { backgroundColor: activeTheme.input, color: activeTheme.text, borderColor: activeTheme.border }]}
              placeholder="Enter PIN Code (6 digits)"
              placeholderTextColor={themeMode === 'dark' ? '#777' : '#999'}
              value={delieveryAddress}
              onChangeText={setDelieveryAddress}
              onSubmitEditing={handleDelieveryAddressChange}
              keyboardType="numeric"
              maxLength={6}
            />
            <TouchableOpacity style={[styles.goButton, { backgroundColor: accentColor }]} onPress={handleDelieveryAddressChange}>
              <Text style={styles.goButtonText}>Set</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.settingsButton, { backgroundColor: activeTheme.input }]} 
              onPress={() => setIsInfoOpen(true)}
            >
              <Text style={{ color: activeTheme.text, fontSize: 16 }}>ℹ️</Text>

            </TouchableOpacity>
          </View>
        */}
        
        <View style={styles.searchRow}>
          <TextInput 
            style={[styles.searchBox, { backgroundColor: activeTheme.input, color: activeTheme.text, borderColor: activeTheme.border }]}
            placeholder="Search items..."
            placeholderTextColor={themeMode === 'dark' ? '#777' : '#999'}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearchExecute}
          />
          <TouchableOpacity style={[styles.goButton, { backgroundColor: accentColor }]} onPress={handleSearchExecute}>
            <Text style={styles.goButtonText}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.settingsButton, { backgroundColor: activeTheme.input }]} 
            onPress={() => setIsSettingsOpen(true)}
          >
            <Text style={{ color: activeTheme.text, fontSize: 16 }}>⚙️</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.viewportContainer}>
        {submittedQuery ? (
          SUPPORTED_SITES.map((site) => {
            if (!activeSites[site.id]) return null;
            const isVisible = activePlatform === site.id;
            return (
              <View 
                key={site.id} 
                style={[styles.webViewWrapper, !isVisible && styles.hiddenWrapper]}
              >
                <WebView
                  ref={refs.current[site.id]}
                  source={{ uri: site.queryUrl(submittedQuery) }}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  onNavigationStateChange={(navState) => updateNavState(site.id, navState)}
                  style={styles.webViewFrame}
                  onShouldStartLoadWithRequest={(request) => {
                    //Blocks ads to some extents
                    if (
                      request.url.includes('aax-eu') || 
                      request.url.includes('amazon-adsystem') || 
                      request.url.includes('google-analytics')
                    ) return false;
                    return true;
                  }}

                />
              </View>
            );
          })
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: activeTheme.textMuted }]}>
              Enter a search keyword above to compare platform matches.
            </Text>
          </View>
        )}
      </View>

      <View style={[styles.tabContainer, { paddingBottom: Math.max(insets.bottom, 12), backgroundColor: activeTheme.card, borderTopColor: activeTheme.border }]}>
          <View 
          style={[{paddingBottom: 10}]}
          >
            <Text style={[styles.emptyText, { color: activeTheme.textMuted }]}>
              Selected Category: 
            </Text>
            <Text style={[styles.emptyText, { color: activeTheme.text }]}>
              {selectedCategory || "Custom"}
            </Text>
          </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollTabsContent}>
          <View style={styles.tabSectionRow}></View>
          {instantSites.length > 0 && (
            <View style={styles.tabSectionRow}>
              {instantSites.map((site) => {
                const isSelected = activePlatform === site.id;
                return (
                  <TouchableOpacity
                    key={site.id}
                    style={[styles.navTab, { backgroundColor: activeTheme.input }, isSelected && { backgroundColor: accentColor }]}
                    onPress={() => setActivePlatform(site.id)}
                  >
                    <Text style={[styles.navTabText, { color: isSelected ? '#000000' : activeTheme.textMuted, textDecorationLine: 'underline'} ]}>
                      {site.name.toUpperCase()}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}

          {standardSites.length > 0 && (
            <View style={styles.tabSectionRow}>
              {standardSites.map((site) => {
                const isSelected = activePlatform === site.id;
                return (
                  <TouchableOpacity
                    key={site.id}
                    style={[styles.navTab, { backgroundColor: activeTheme.input }, isSelected && { backgroundColor: accentColor }]}
                    onPress={() => setActivePlatform(site.id)}
                  >
                    <Text style={[styles.navTabText, { color: isSelected ? '#000000' : activeTheme.textMuted }]}>
                      {site.name.toUpperCase()}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}

          {fallbackSites.length > 0 && (
            <View style={styles.tabSectionRow}>
              {fallbackSites.map((site) => {
                const isSelected = activePlatform === site.id;
                return (
                  <TouchableOpacity
                    key={site.id}
                    style={[styles.navTab, { backgroundColor: activeTheme.input }, isSelected && { backgroundColor: accentColor }]}
                    onPress={() => setActivePlatform(site.id)}
                  >
                    <Text style={[styles.navTabText, { color: isSelected ? '#000000' : activeTheme.textMuted }]}>
                      {site.name.toUpperCase()}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}


        </ScrollView>
      </View>

      <Modal 
        visible={isInfoOpen} 
        animationType="slide" 
        transparent={true} 
        onRequestClose={() => setIsInfoOpen(false)}
      >
        <View style={styles.modalBlurOverlay}>
          <View style={[styles.settingsCard, { backgroundColor: activeTheme.card, borderColor: activeTheme.border, height: 'auto', maxHeight: '80%' }]}>
            <Text style={[styles.modalTitle, { color: activeTheme.text }]}>ℹ️ PIN Code Info</Text>
            <ScrollView style={{ marginVertical: 10 }}>
              <Text style={{ color: activeTheme.text, fontSize: 16, fontWeight: 'bold', marginBottom: 12 }}>
                How Automatic PIN Code Setting Works:
              </Text>
              <Text style={{ color: activeTheme.textMuted, fontSize: 14, lineHeight: 20, marginBottom: 10 }}>
                • The app attempts to automatically send an HTTP request to each site's backend server within their web sessions to set your PIN code.
              </Text>
              <Text style={{ color: activeTheme.text, fontSize: 15, fontWeight: 'bold', marginBottom: 6, marginTop: 10 }}>
                If it does not work:
              </Text>
              <Text style={{ color: activeTheme.textMuted, fontSize: 14, lineHeight: 20, marginBottom: 10 }}>
                • Simply set the PIN code manually once on that site's page.
              </Text>
              <Text style={{ color: activeTheme.textMuted, fontSize: 14, lineHeight: 20, marginBottom: 10 }}>
                • Once set, the site will remember it and it will remain active for the rest of your session.
              </Text>
            </ScrollView>
            <TouchableOpacity style={[styles.closeModalButton, { backgroundColor: accentColor }]} onPress={() => setIsInfoOpen(false)}>
              <Text style={styles.closeModalText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal 
        visible={isSettingsOpen} 
        animationType="slide" 
        transparent={true} 
        onRequestClose={() => setIsSettingsOpen(false)}
      >
        <View style={styles.modalBlurOverlay}>
          <View style={[styles.settingsCard, { backgroundColor: activeTheme.card, borderColor: activeTheme.border }]}>
            <Text style={[styles.modalTitle, { color: activeTheme.text }]}>App Settings</Text>
            
            <ScrollView style={{ flex: 1 }}>
              
              <Text style={[styles.settingsGroupHeader, { color: accentColor }]}>COMPARE PLATFORMS</Text>
              
              <Text style={[styles.subSectionHeader, { color: activeTheme.textMuted }]}>Instant Delivery</Text>
              {SUPPORTED_SITES.filter(s => s.type === 'Instant').map(site => (
                <TouchableOpacity 
                  key={site.id}
                  style={[styles.toggleRow, { borderBottomColor: activeTheme.border }]}
                  onPress={() => {
                    setActiveSites(prev => ({ ...prev, [site.id]: !prev[site.id] }));
                    setSelectedCategory(null);
                  }}
                >
                  <Text style={{ color: activeTheme.text, fontSize: 15 }}>{site.name}</Text>
                  <View style={[styles.checkboxContainer, { borderColor: accentColor }, activeSites[site.id] && { backgroundColor: accentColor }]}>
                    {activeSites[site.id] && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                </TouchableOpacity>
              ))}

              <Text style={[styles.subSectionHeader, { color: activeTheme.textMuted, marginTop: 12 }]}>Standard Delivery</Text>
              {SUPPORTED_SITES.filter(s => s.type === 'Standard').map(site => (
                <TouchableOpacity 
                  key={site.id}
                  style={[styles.toggleRow, { borderBottomColor: activeTheme.border }]}
                  onPress={() => {
                    setActiveSites(prev => ({ ...prev, [site.id]: !prev[site.id] }));
                    setSelectedCategory(null);
                  }}
                >
                  <Text style={{ color: activeTheme.text, fontSize: 15 }}>{site.name}</Text>
                  <View style={[styles.checkboxContainer, { borderColor: accentColor }, activeSites[site.id] && { backgroundColor: accentColor }]}>
                    {activeSites[site.id] && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                </TouchableOpacity>
              ))}

              <Text style={[styles.subSectionHeader, { color: activeTheme.textMuted, marginTop: 12 }]}>Falback</Text>
              {SUPPORTED_SITES.filter(s => s.type === 'Fallback').map(site => (
                <TouchableOpacity 
                  key={site.id}
                  style={[styles.toggleRow, { borderBottomColor: activeTheme.border }]}
                  onPress={() => {
                    setActiveSites(prev => ({ ...prev, [site.id]: !prev[site.id] }));
                    setSelectedCategory(null);
                  }}
                >
                  <Text style={{ color: activeTheme.text, fontSize: 15 }}>{site.name}</Text>
                  <View style={[styles.checkboxContainer, { borderColor: accentColor }, activeSites[site.id] && { backgroundColor: accentColor }]}>
                    {activeSites[site.id] && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                </TouchableOpacity>
              ))}

              
              <Text style={[styles.settingsGroupHeader, { color: accentColor, marginTop: 20 }]}>Select Categories</Text>
              <View>
                {Object.values(categories).map(category => (
                  <TouchableOpacity 
                    key={category}
                    style={[styles.themeOptionButton, { backgroundColor: activeTheme.input }, selectedCategory === category && { borderColor: accentColor, borderWidth: 2 }]}
                    onPress={() => selectCategories(category)}
                  >
                    <Text style={{ color: activeTheme.text, textTransform: 'uppercase', fontWeight: 'bold', fontSize: 12 }}>{category}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={[styles.settingsGroupHeader, { color: accentColor, marginTop: 20 }]}>BASE ENGINE THEME</Text>
              <View style={styles.row}>
                {['dark', 'light'].map(mode => (
                  <TouchableOpacity 
                    key={mode}
                    style={[styles.themeOptionButton, { backgroundColor: activeTheme.input }, themeMode === mode && { borderColor: accentColor, borderWidth: 2 }]}
                    onPress={() => setThemeMode(mode)}
                  >
                    <Text style={{ color: activeTheme.text, textTransform: 'uppercase', fontWeight: 'bold', fontSize: 12 }}>{mode}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={[styles.settingsGroupHeader, { color: accentColor, marginTop: 20 }]}>ACCENT PALETTE</Text>
              <View style={[styles.row, { flexWrap: 'wrap' }]}>
                {accentPresets.map(color => (
                  <TouchableOpacity
                    key={color}
                    style={[styles.accentBubble, { backgroundColor: color }, accentColor === color && styles.activeAccentBubble]}
                    onPress={() => setAccentColor(color)}
                  />
                ))}
              </View>
            </ScrollView>

            <TouchableOpacity style={[styles.closeModalButton, { backgroundColor: accentColor }]} onPress={() => setIsSettingsOpen(false)}>
              <Text style={styles.closeModalText}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <MainAppContent />
    </SafeAreaProvider>
  );
}