import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Keyboard } from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {
  const [pinCode, setPinCode] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePlatform, setActivePlatform] = useState('blinkit');
  const [submittedQuery, setSubmittedQuery] = useState('');

  const webViewRef = useRef(null);

  // Quick commerce URLs with query parameters
  const platforms = {
    blinkit: `https://blinkit.com/s/?q=${encodeURIComponent(submittedQuery)}`,
    zepto: `https://zeptonow.com/search?query=${encodeURIComponent(submittedQuery)}`,
    swiggy: `https://www.swiggy.com/instamart/search?query=${encodeURIComponent(submittedQuery)}`,
  };

  const handleSearch = () => {
    Keyboard.dismiss();
    setSubmittedQuery(searchQuery);
  };

  // JavaScript injection payload to try overriding address/pincode hooks on the DOM
  const injectPincodeData = `
    (function() {
      // Attempting to set local storage elements platforms look for
      window.localStorage.setItem('user_pincode', '${pinCode}');
      window.localStorage.setItem('pincode', '${pinCode}');
      
      // Post a message back to confirm execution
      window.ReactNativeWebView.postMessage("Pincode ${pinCode} applied to DOM Context");
    })();
  `;

  return (
    <SafeAreaView style={styles.container}>
      {/* Configuration Inputs */}
      <View style={styles.header}>
        <TextInput 
          style={styles.pinInput}
          placeholder="Pin Code (e.g. 110001)"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={pinCode}
          onChangeText={setPinCode}
          maxLength={6}
        />
        <View style={styles.searchRow}>
          <TextInput 
            style={styles.searchInput}
            placeholder="Search item (e.g., Milk, Maggi)"
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Go</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Aggregator Browser View */}
      <View style={styles.browserContainer}>
        {submittedQuery ? (
          <WebView
            ref={webViewRef}
            source={{ uri: platforms[activePlatform] }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            injectedJavaScriptBeforeContentLoaded={injectPincodeData}
            onMessage={(event) => console.log(event.nativeEvent.data)}
            style={{ flex: 1 }}
          />
        ) : (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>Enter a search term above to compare delivery options</Text>
          </View>
        )}
      </View>

      {/* Platform Selector Navigation Bar */}
      <View style={styles.tabBar}>
        {Object.keys(platforms).map((platform) => (
          <TouchableOpacity
            key={platform}
            style={[
              styles.tabButton,
              activePlatform === platform && styles.activeTabButton
            ]}
            onPress={() => setActivePlatform(platform)}
          >
            <Text style={[
              styles.tabText,
              activePlatform === platform && styles.activeTabText
            ]}>
              {platform.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    padding: 16,
    backgroundColor: '#1f1f1f',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  pinInput: {
    backgroundColor: '#333',
    color: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 14,
  },
  searchRow: {
    flexDirection: 'row',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#333',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    marginRight: 10,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#ff9900',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  searchButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  browserContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#121212'
  },
  placeholderText: {
    color: '#aaa',
    textAlign: 'center',
    fontSize: 16,
  },
  tabBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#1f1f1f',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTabButton: {
    borderTopWidth: 3,
    borderTopColor: '#ff9900',
    backgroundColor: '#2a2a2a',
  },
  tabText: {
    color: '#aaa',
    fontWeight: '600',
    fontSize: 12,
  },
  activeTabText: {
    color: '#ff9900',
  },
});