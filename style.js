import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  appContainer: { flex: 1 },
  controlHub: { paddingHorizontal: 14, paddingBottom: 14, borderBottomWidth: 1 },
  searchRow: { flexDirection: 'row', alignItems: 'center' },

  searchBox: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginRight: 6,
    fontSize: 15,
    borderWidth: 1
  },

  goButton: {
    paddingVertical: 11,
    paddingHorizontal: 16,
    marginRight: 6
  },

  goButtonText: {
    color: '#000000',
    fontWeight: '700',
    fontSize: 14
  },

  settingsButton: {
    width: 42,
    height: 41,
    justifyContent: 'center',
    alignItems: 'center'
  },

  viewportContainer: { flex: 1 },
  webViewWrapper: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  hiddenWrapper: { opacity: 0, transform: [{ scale: 0 }], pointerEvents: 'none' },
  webViewFrame: { flex: 1 },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40
  },

  emptyText: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20
  },

  tabContainer: { borderTopWidth: 1, paddingTop: 8 },
  scrollTabsContent: {
    paddingHorizontal: 6,
    alignItems: 'center',
    flexDirection: 'row'
  },

  tabSectionRow: {
    flexDirection: 'row',
    marginRight: 10,
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: '#333',
  },

  navTab: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    alignItems: 'center',
    marginHorizontal: 0
  },

  navTabText: {
    fontSize: 11,
    fontWeight: '700'
  },

  row: { flexDirection: 'row', width: '100%' },

  // Settings modal
  modalBlurOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    padding: 20
  },

  settingsCard: {
    width: '100%',
    height: '80%',
    padding: 20
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15
  },

  settingsGroupHeader: {
    fontSize: 11,
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: 1
  },

  subSectionHeader: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 4
  },

  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1
  },

  checkboxContainer: {
    width: 20,
    height: 20,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },

  checkmark: {
    color: '#000',
    fontSize: 11,
    fontWeight: 'bold'
  },

  themeOptionButton: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    marginTop: 4
  },

  accentBubble: {
    width: 36,
    height: 36,
    borderRadius: 18,
    margin: 6
  },

  activeAccentBubble: {
    borderWidth: 3,
    borderColor: '#fff'
  },

  closeModalButton: {
    marginTop: 20,
    padding: 14,
    alignItems: 'center'
  },

  closeModalText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16
  }
});