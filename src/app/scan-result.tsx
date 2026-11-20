import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PRICE_COMPARISON = [
  { id: '1', store: 'Amazon', price: '$118.00', badge: 'BEST PRICE', delivery: 'Free 1-Day Delivery', best: true },
  { id: '2', store: 'Nike Official', price: '$130.00', badge: 'IN STOCK', delivery: 'Free Member Shipping', best: false },
  { id: '3', store: 'Foot Locker', price: '$150.00', badge: 'NEARBY (1.2 mi)', delivery: 'Pickup Today', best: false },
];

const COUPONS = [
  { id: 'c1', code: 'CATCH20', discount: '20% OFF ($23.60 saved)', successRate: '96% verified' },
  { id: 'c2', code: 'FREESHIP', discount: 'Free Express Shipping', successRate: '91% verified' },
];

export default function ScanResultScreen() {
  const router = useRouter();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCoupon = (code: string) => {
    setCopiedCode(code);
    if (Platform.OS !== 'web') {
      Alert.alert('Coupon Copied', `Code "${code}" copied to clipboard!`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color="#F8FAFC" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Deal Hub & Analysis</Text>
        <View style={styles.confidenceBadge}>
          <Text style={styles.confidenceText}>94% Match</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Detected Product Hero Card */}
        <View style={styles.productCard}>
          <View style={styles.productIconBox}>
            <Ionicons name="pricetag" size={30} color="#00E5A0" />
          </View>
          <View style={styles.productInfo}>
            <Text style={styles.categoryLabel}>FOOTWEAR • VISUAL + BARCODE MATCH</Text>
            <Text style={styles.productName}>Nike Air Max 270 React</Text>
            <View style={styles.priceRow}>
              <Text style={styles.bestPrice}>$118.00</Text>
              <Text style={styles.originalPrice}>$150.00</Text>
              <View style={styles.savePill}>
                <Text style={styles.savePillText}>SAVE 21%</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Cross-Store Price Comparison */}
        <Text style={styles.sectionTitle}>Live Price Comparison</Text>
        {PRICE_COMPARISON.map((item) => (
          <View
            key={item.id}
            style={[styles.storeRow, item.best && styles.storeRowBest]}
          >
            <View>
              <View style={styles.storeTitleRow}>
                <Text style={styles.storeName}>{item.store}</Text>
                <View style={[styles.badge, item.best && styles.badgeBest]}>
                  <Text style={[styles.badgeText, item.best && styles.badgeTextBest]}>
                    {item.badge}
                  </Text>
                </View>
              </View>
              <Text style={styles.deliveryText}>{item.delivery}</Text>
            </View>
            <Text style={[styles.storePrice, item.best && styles.storePriceBest]}>
              {item.price}
            </Text>
          </View>
        ))}

        {/* Validated Promo Codes */}
        <Text style={styles.sectionTitle}>Active Coupons & Promo Codes</Text>
        {COUPONS.map((coupon) => {
          const isCopied = copiedCode === coupon.code;
          return (
            <View key={coupon.id} style={styles.couponCard}>
              <View>
                <Text style={styles.couponCode}>{coupon.code}</Text>
                <Text style={styles.couponDesc}>{coupon.discount}</Text>
                <Text style={styles.couponMeta}>{coupon.successRate}</Text>
              </View>
              <TouchableOpacity
                style={[styles.copyBtn, isCopied && styles.copyBtnActive]}
                onPress={() => handleCopyCoupon(coupon.code)}
              >
                <Text style={[styles.copyBtnText, isCopied && styles.copyBtnTextActive]}>
                  {isCopied ? 'Copied ✓' : 'Apply Code'}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0F1C', paddingHorizontal: 18 },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#131C31',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  headerTitle: { color: '#F8FAFC', fontSize: 17, fontWeight: '700' },
  confidenceBadge: {
    backgroundColor: 'rgba(0, 229, 160, 0.14)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  confidenceText: { color: '#00E5A0', fontSize: 12, fontWeight: '700' },
  scrollContent: { paddingBottom: 32 },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#131C31',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1E293B',
    alignItems: 'center',
    gap: 14,
    marginBottom: 22,
  },
  productIconBox: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 229, 160, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productInfo: { flex: 1 },
  categoryLabel: { color: '#38BDF8', fontSize: 10, fontWeight: '700', letterSpacing: 0.8 },
  productName: { color: '#F8FAFC', fontSize: 18, fontWeight: '800', marginVertical: 4 },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  bestPrice: { color: '#00E5A0', fontSize: 20, fontWeight: '800' },
  originalPrice: { color: '#64748B', fontSize: 14, textDecorationLine: 'line-through' },
  savePill: {
    backgroundColor: '#00E5A0',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  savePillText: { color: '#0A0F1C', fontSize: 10, fontWeight: '800' },
  sectionTitle: { color: '#F8FAFC', fontSize: 16, fontWeight: '700', marginBottom: 12 },
  storeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#131C31',
    padding: 15,
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  storeRowBest: { borderColor: '#00E5A0' },
  storeTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  storeName: { color: '#F8FAFC', fontSize: 15, fontWeight: '700' },
  badge: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeBest: { backgroundColor: 'rgba(0, 229, 160, 0.16)' },
  badgeText: { color: '#94A3B8', fontSize: 10, fontWeight: '700' },
  badgeTextBest: { color: '#00E5A0' },
  deliveryText: { color: '#94A3B8', fontSize: 12 },
  storePrice: { color: '#E2E8F0', fontSize: 17, fontWeight: '700' },
  storePriceBest: { color: '#00E5A0', fontSize: 18, fontWeight: '800' },
  couponCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#131C31',
    padding: 15,
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#38BDF8',
  },
  couponCode: { color: '#38BDF8', fontSize: 16, fontWeight: '800', letterSpacing: 1 },
  couponDesc: { color: '#F8FAFC', fontSize: 13, marginTop: 2 },
  couponMeta: { color: '#64748B', fontSize: 11, marginTop: 2 },
  copyBtn: {
    backgroundColor: '#38BDF8',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  copyBtnActive: { backgroundColor: '#00E5A0' },
  copyBtnText: { color: '#0A0F1C', fontSize: 12, fontWeight: '800' },
  copyBtnTextActive: { color: '#0A0F1C' },
});