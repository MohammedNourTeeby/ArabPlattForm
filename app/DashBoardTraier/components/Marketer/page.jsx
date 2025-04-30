"use client"
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  TextField,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  ContentCopy,
  PersonAdd,
  AttachMoney,
  BarChart
} from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';

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
  marketers: [
    {
      id: 'mk1',
      name: 'أحمد محمد',
      email: 'ahmed@example.com',
      code: 'MKTR-5X9P',
      commissionRate: 15,
      totalSales: 45,
      earnings: 6750
    },
    {
      id: 'mk2',
      name: 'فاطمة علي',
      email: 'fatima@example.com',
      code: 'MKTR-3B2Q',
      commissionRate: 20,
      totalSales: 32,
      earnings: 5120
    }
  ]
};

const MarketersSystem = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentMarketer, setCurrentMarketer] = useState({});
  const [formData, setFormData] = useState({ name: '', email: '', commissionRate: '' });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const generateUniqueCode = () => `MKTR-${uuidv4().substr(0, 5).toUpperCase()}`;

  const handleSubmit = () => {
    const newMarketer = {
      id: uuidv4(),
      code: generateUniqueCode(),
      name: formData.name,
      email: formData.email,
      commissionRate: formData.commissionRate,
      totalSales: 0,
      earnings: 0
    };
    
    dummyData.marketers.push(newMarketer);
    setOpenDialog(false);
    setFormData({ name: '', email: '', commissionRate: '' });
  };

  const handleDelete = (marketerId) => {
    dummyData.marketers = dummyData.marketers.filter(m => m.id !== marketerId);
  };

  return (
    <Box sx={{
      p: isMobile ? 2 : 4,
      backgroundColor: themeColors.white,
      minHeight: '100vh'
    }}>
      {/* شريط العنوان والإحصائيات */}
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
          gap: 1,
          mb: 3
        }}>
          <BarChart sx={{ color: themeColors.blue }} />
          نظام إدارة المسوقين
        </Typography>

        <Grid container spacing={3}>
          {[
            { 
              title: 'إجمالي المسوقين',
              value: dummyData.marketers.length,
              color: themeColors.blue,
              icon: <PersonAdd />
            },
            { 
              title: 'إجمالي المبيعات',
              value: dummyData.marketers.reduce((sum, m) => sum + m.totalSales, 0),
              color: themeColors.yellow,
              icon: <AttachMoney />
            },
            { 
              title: 'إجمالي الأرباح',
              value: dummyData.marketers.reduce((sum, m) => sum + m.earnings, 0),
              color: themeColors.red,
              icon: <AttachMoney />
            }
          ].map((stat, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: stat.color,
                color: themeColors.white,
                transition: 'transform 0.3s',
                '&:hover': { transform: 'translateY(-5px)' }
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6">{stat.title}</Typography>
                  {React.cloneElement(stat.icon, { sx: { fontSize: 32 } })}
                </Box>
                <Typography variant="h4" sx={{ mt: 1, fontWeight: 'bold' }}>
                  {stat.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* جدول المسوقين */}
      <Paper sx={{ 
        p: 3, 
        borderRadius: 2,
        boxShadow: 3
      }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 2
        }}>
          <Typography variant="h5" sx={{ color: themeColors.black }}>
            قائمة المسوقين
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpenDialog(true)}
            sx={{
              backgroundColor: themeColors.blue,
              '&:hover': { backgroundColor: '#006699' }
            }}
          >
            إضافة مسوق جديد
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: themeColors.gray + '22' }}>
              <TableRow>
                <TableCell>الاسم</TableCell>
                <TableCell>الكود التسويقي</TableCell>
                <TableCell>نسبة العمولة</TableCell>
                <TableCell>المبيعات</TableCell>
                <TableCell>الأرباح</TableCell>
                <TableCell>الإجراءات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dummyData.marketers.map((marketer) => (
                <TableRow key={marketer.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography>{marketer.name}</Typography>
                      <Typography variant="body2" sx={{ color: themeColors.gray }}>
                        {marketer.email}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={marketer.code}
                      icon={<ContentCopy />}
                      onClick={() => navigator.clipboard.writeText(marketer.code)}
                      sx={{ 
                        backgroundColor: themeColors.gray + '22',
                        color: themeColors.black
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={`${marketer.commissionRate}%`}
                      sx={{ 
                        backgroundColor: themeColors.yellow,
                        color: themeColors.black
                      }}
                    />
                  </TableCell>
                  <TableCell>{marketer.totalSales}</TableCell>
                  <TableCell>${marketer.earnings}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton
                        sx={{ color: themeColors.blue }}
                        onClick={() => {
                          setCurrentMarketer(marketer);
                          setEditMode(true);
                          setOpenDialog(true);
                        }}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton 
                        sx={{ color: themeColors.red }}
                        onClick={() => handleDelete(marketer.id)}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* نموذج إضافة/تعديل مسوق */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle sx={{ color: themeColors.black }}>
          {editMode ? 'تعديل بيانات المسوق' : 'إضافة مسوق جديد'}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="اسم المسوق"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="البريد الإلكتروني"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="نسبة العمولة (%)"
            type="number"
            inputProps={{ min: 1, max: 100 }}
            value={formData.commissionRate}
            onChange={(e) => setFormData({ ...formData, commissionRate: e.target.value })}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDialog(false);
              setFormData({ name: '', email: '', commissionRate: '' });
            }}
            sx={{ color: themeColors.red }}
          >
            إلغاء
          </Button>
          <Button
            onClick={handleSubmit}
            sx={{
              backgroundColor: themeColors.blue,
              color: themeColors.white,
              '&:hover': { backgroundColor: '#006699' }
            }}
          >
            {editMode ? 'حفظ التعديلات' : 'إضافة المسوق'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MarketersSystem;