import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const RECENT_SCANS = [
  { id: '1', name: 'Nike Air Max 270', bestPrice: '$118.00', store: 'Amazon', savings: 'Save $32' },
  { id: '2', name: 'Sony WH-1000XM5', bestPrice: '$298.00', store: 'Best Buy', savings: 'Save $101' },
  { id: '3', name: 'Stanley Quencher 40oz', bestPrice: '$35.00', store: 'Target', savings: 'Save $10' },
];

export default function CatchHomeScreen() {
  const router = useRouter();
  const [flashOn, setFlashOn] = useState(false);
  const [scanning, setScanning] = useState(false);

  const handleCapture = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      router.push('/scan-result');
    }, 600);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <View style={styles.logoBadge}>
            <Ionicons name="scan" size={18} color="#0A0F1C" />
          </View>
          <Text style={styles.brandTitle}>CATCH</Text>
        </View>
        <View style={styles.locationPill}>
          <Ionicons name="location-sharp" size={14} color="#00E5A0" />
          <Text style={styles.locationText}>Nearby Deals Active</Text>
        </View>
      </View>

      {/* Camera / Edge Vision Viewfinder */}
      <View style={styles.viewfinderContainer}>
        <View style={styles.viewfinderFrame}>
          {/* Corner Brackets */}
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />

          <Ionicons
            name={scanning ? 'sync-circle' : 'camera-outline'}
            size={48}
            color="#00E5A0"
          />
          <Text style={styles.viewfinderHint}>
            {scanning
              ? 'Identifying item (≥ 0.70 confidence)...'
              : Platform.OS === 'web'
              ? 'Edge Vision Preview (Point at any product or barcode)'
              : 'Align product inside frame to track prices & coupons'}
          </Text>

          <TouchableOpacity
            style={styles.flashButton}
            onPress={() => setFlashOn(!flashOn)}
          >
            <Ionicons
              name={flashOn ? 'flash' : 'flash-off'}
              size={18}
              color={flashOn ? '#00E5A0' : '#94A3B8'}
            />
          </TouchableOpacity>
        </View>

        {/* Capture Action Bar */}
        <View style={styles.controlsRow}>
          <TouchableOpacity style={styles.sideAction} onPress={handleCapture}>
            <Ionicons name="images-outline" size={22} color="#E2E8F0" />
            <Text style={styles.sideActionLabel}>Gallery</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.shutterOuter}
            onPress={handleCapture}
            activeOpacity={0.8}
          >
            <View style={styles.shutterInner}>
              <Ionicons name="sparkles" size={24} color="#0A0F1C" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.sideAction} onPress={handleCapture}>
            <Ionicons name="barcode-outline" size={22} color="#E2E8F0" />
            <Text style={styles.sideActionLabel}>Barcode</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Scans Carousel */}
      <View style={styles.recentSection}>
        <View style={styles.recentHeader}>
          <Text style={styles.recentTitle}>Recent Captures</Text>
          <Text style={styles.latencyBadge}>Inference &lt; 1.0s</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {RECENT_SCANS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.scanCard}
              onPress={() => router.push('/scan-result')}
            >
              <View style={styles.savingsTag}>
                <Text style={styles.savingsText}>{item.savings}</Text>
              </View>
              <Text style={styles.itemName} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.itemPrice}>
                {item.bestPrice}{' '}
                <Text style={styles.storeName}>• {item.store}</Text>
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F1C',
    paddingHorizontal: 18,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoBadge: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#00E5A0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitle: {
    color: '#F8FAFC',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#131C31',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  locationText: {
    color: '#CBD5E1',
    fontSize: 12,
    fontWeight: '600',
  },
  viewfinderContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  viewfinderFrame: {
    flex: 1,
    backgroundColor: '#111827',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 26,
    height: 26,
    borderColor: '#00E5A0',
  },
  topLeft: { top: 18, left: 18, borderTopWidth: 3, borderLeftWidth: 3, borderTopLeftRadius: 8 },
  topRight: { top: 18, right: 18, borderTopWidth: 3, borderRightWidth: 3, borderTopRightRadius: 8 },
  bottomLeft: { bottom: 18, left: 18, borderBottomWidth: 3, borderLeftWidth: 3, borderBottomLeftRadius: 8 },
  bottomRight: { bottom: 18, right: 18, borderBottomWidth: 3, borderRightWidth: 3, borderBottomRightRadius: 8 },
  viewfinderHint: {
    color: '#94A3B8',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 14,
    maxWidth: 260,
  },
  flashButton: {
    position: 'absolute',
    top: 18,
    right: 54,
    backgroundColor: '#1E293B',
    padding: 8,
    borderRadius: 20,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 18,
  },
  sideAction: {
    alignItems: 'center',
    gap: 4,
  },
  sideActionLabel: {
    color: '#94A3B8',
    fontSize: 12,
  },
  shutterOuter: {
    width: 74,
    height: 74,
    borderRadius: 37,
    borderWidth: 3,
    borderColor: '#00E5A0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#00E5A0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recentSection: {
    paddingBottom: 16,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  recentTitle: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '700',
  },
  latencyBadge: {
    color: '#00E5A0',
    fontSize: 11,
    fontWeight: '600',
    backgroundColor: 'rgba(0, 229, 160, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  scanCard: {
    backgroundColor: '#131C31',
    borderRadius: 16,
    padding: 14,
    marginRight: 12,
    width: 180,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  savingsTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0, 229, 160, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 8,
  },
  savingsText: {
    color: '#00E5A0',
    fontSize: 11,
    fontWeight: '700',
  },
  itemName: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemPrice: {
    color: '#38BDF8',
    fontSize: 14,
    fontWeight: '700',
  },
  storeName: {
    color: '#94A3B8',
    fontWeight: '400',
    fontSize: 12,
  },
});