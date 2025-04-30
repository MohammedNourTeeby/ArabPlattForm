"use client"
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Button, 
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  ArrowDownward, 
  AttachMoney, 
  InsertChart, 
  AccountBalanceWallet, 
  Download 
} from '@mui/icons-material';
import { PieChart, Pie, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import * as XLSX from 'xlsx';

// الألوان المحددة
const themeColors = {
  blue: '#008DCB',
  black: '#0D1012',
  gray: '#999999',
  red: '#E2101E',
  white: '#FFFFFF',
  yellow: '#F9D011'
};

// بيانات وهمية
const dummyData = {
  totalEarnings: 24500,
  monthlyEarnings: 8500,
  withdrawals: 12000,
  pendingBalance: 4500,
  earningsData: [
    { month: 'Jan', earnings: 4000 },
    { month: 'Feb', earnings: 3000 },
    { month: 'Mar', earnings: 5000 },
    { month: 'Apr', earnings: 8500 },
  ],
  transactions: [
    { id: 1, date: '2024-03-15', course: 'React Advanced', amount: 1500, status: 'Completed' },
    { id: 2, date: '2024-04-02', course: 'UI/UX Pro', amount: 2500, status: 'Pending' },
    { id: 3, date: '2024-05-20', course: 'Web Development', amount: 4500, status: 'Completed' },
  ],
  revenueSources: [
    { name: 'Direct Sales', value: 4000 },
    { name: 'Subscriptions', value: 6500 },
    { name: 'Partnerships', value: 2000 },
  ]
};

const FinanceDashboard = () => {
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(dummyData.transactions);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Transactions");
    XLSX.writeFile(wb, "Financial_Report.xlsx");
  };

  return (
    <Box sx={{ 
      p: isMobile ? 2 : 4,
      backgroundColor: themeColors.white,
      minHeight: '100vh'
    }}>
      {/* العنوان الرئيسي */}
      <Box sx={{ 
        mb: 4,
        borderBottom: `2px solid ${themeColors.gray}`,
        pb: 2
      }}>
        <Typography variant="h4" sx={{ 
          color: themeColors.black,
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <AccountBalanceWallet sx={{ color: themeColors.blue }} />
          لوحة التحكم المالية
        </Typography>
      </Box>

      {/* بطاقات الإحصائيات */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { title: 'إجمالي الأرباح', value: `$${dummyData.totalEarnings}`, icon: <AttachMoney />, color: themeColors.blue },
          { title: 'أرباح هذا الشهر', value: `$${dummyData.monthlyEarnings}`, icon: <InsertChart />, color: themeColors.yellow },
          { title: 'السحوبات', value: `$${dummyData.withdrawals}`, icon: <ArrowDownward />, color: themeColors.red },
          { title: 'الرصيد المعلق', value: `$${dummyData.pendingBalance}`, icon: <AccountBalanceWallet />, color: themeColors.gray },
        ].map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper sx={{
              p: 2,
              borderRadius: 2,
              backgroundColor: card.color,
              color: themeColors.white,
              transition: 'transform 0.3s',
              '&:hover': { transform: 'translateY(-5px)' }
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">{card.title}</Typography>
                {React.cloneElement(card.icon, { sx: { fontSize: 32 } })}
              </Box>
              <Typography variant="h4" sx={{ mt: 1, fontWeight: 'bold' }}>
                {card.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* المخططات */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, color: themeColors.black }}>
              تطور الأرباح
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={dummyData.earningsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="earnings" 
                  stroke={themeColors.blue} 
                  fill={themeColors.blue}
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, color: themeColors.black }}>
              مصادر الإيرادات
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dummyData.revenueSources}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill={themeColors.blue}
                  dataKey="value"
                  label
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* سحب الأرباح */}
      <Paper sx={{ 
        p: 3, 
        mb: 4, 
        borderRadius: 2,
        backgroundColor: themeColors.white,
        boxShadow: 3
      }}>
        <Typography variant="h6" sx={{ mb: 2, color: themeColors.black }}>
          سحب الأرباح
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>طريقة السحب</InputLabel>
              <Select
                value={selectedMethod}
                onChange={(e) => setSelectedMethod(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="paypal">PayPal</MenuItem>
                <MenuItem value="bank">حساب بنكي</MenuItem>
                <MenuItem value="crypto">محفظة رقمية</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="المبلغ المطلوب"
              type="number"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              sx={{ borderRadius: 2 }}
            />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Button
              fullWidth
              variant="contained"
              sx={{
                height: '56px',
                backgroundColor: themeColors.blue,
                '&:hover': { backgroundColor: '#006699' }
              }}
            >
              تأكيد السحب
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* جدول العمليات */}
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 2
        }}>
          <Typography variant="h6" sx={{ color: themeColors.black }}>
            السجلات المالية
          </Typography>
          <Button
            variant="outlined"
            startIcon={<Download />}
            onClick={handleExportExcel}
            sx={{
              borderColor: themeColors.blue,
              color: themeColors.blue,
              '&:hover': { backgroundColor: '#008DCB22' }
            }}
          >
            تصدير كإكسل
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: themeColors.gray + '22' }}>
              <TableRow>
                <TableCell>التاريخ</TableCell>
                <TableCell>الدورة</TableCell>
                <TableCell>المبلغ</TableCell>
                <TableCell>الحالة</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dummyData.transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.course}</TableCell>
                  <TableCell>${transaction.amount}</TableCell>
                  <TableCell sx={{ 
                    color: transaction.status === 'Completed' ? themeColors.blue : themeColors.red,
                    fontWeight: 'bold'
                  }}>
                    {transaction.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default FinanceDashboard;