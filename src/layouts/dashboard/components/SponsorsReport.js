import {
    Box,
    Button,
    Card,
    Container,
    FormControl,
    MenuItem,
    OutlinedInput,
    Select,
    Stack,
    Typography,
  } from '@mui/material';
  import { useMemo, useState } from 'react';
  import DataWidget from 'components/Global/DataWidget';
import Scrollbar from 'components/Global/scrollbar/Scrollbar';
  import { useFetcher } from 'apiFetch';
  import SoftTypography from 'components/SoftTypography';
  import SoftBadge from 'components/SoftBadge';
  import { Author } from 'layouts/tables/data/authorsTableData';
  import SoftButton from 'components/SoftButton';
  import jsPDF from 'jspdf';
  import 'jspdf-autotable';
  import Table from 'examples/Tables/Table';
//   import Label from 'components/label/Label';
//   import moment from 'moment';
  const MONTHS = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
  };
  function years() {
    const currentYear = new Date().getFullYear();
    const years = [];
  
    for (let year = 2023; year <= currentYear; year++) {
      years.push(year);
    }
  
    return years;
  }
  // ----------------------------------------------------------------------
  
  const headLabel = [
      'No',
      'Names',
      'Phone Number',
      'National ID',
      'Resident Cell',
      'Has Sponsor',
    ];
  
  const SponsorsReport = () => {
    const [date, setDate] = useState({
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      isYearly: false,
    });
    const { data, isError, isLoading } = useFetcher(
      `/sponsor?date=${JSON.stringify(date)}`
    );
  
    const sponsors = useMemo(() => {
      return data?.data || [];
    }, [data?.data]);
  
    const exportPDF = () => {
      const unit = 'mm';
      const size = 'A4';
      const orientation = 'portrait';
  
      const marginLeft = 10;
      const doc = new jsPDF(orientation, unit, size);
  
      doc.setFontSize(12);
  
      const data = sponsors.map(
        (
          {
            names,
            phoneNumber
          },
          index,
        ) => {
  
          return [
            index + 1,
            names,
            phoneNumber
          ];
        },
      );
  
      let content = {
        startY: 20,
        headStyles: {
          fillColor: '#008D41',
        },
        head: [
          [
            'No',
            'Names',
            'Phone Number'
          ],
        ],
        body: data,
        willDrawCell: function (data) {
          var doc = data.doc;
          var rows = data.table.body;
          if (rows.length === 1) {
          } else if (data.row.index === rows.length - 1) {
            // doc.setFontStyle('bold');
            doc.setFontSize('10');
            doc.setFillColor(255, 255, 255);
          }
        },
      };
  
      doc.text(
        `SPONSORS REPORT FOR ${
          date.isYearly ? 'YEAR' : MONTHS[date.month].toUpperCase()
        } ${date.year}`,
        marginLeft + 4,
        15,
      );
  
      doc.autoTable(content);
  
      const pageCount = doc.internal.getNumberOfPages();
      for (var i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.text(
          'Page ' + String(i) + ' of ' + String(pageCount),
          210 - 20,
          297 - 10,
          null,
          null,
          'right',
        );
      }
      doc.save(
        `Sponsors - ${
          date.isYearly ? '' : MONTHS[date.month]
        } ${date.year}.pdf`,
      );
    };

    const authorsTableData = {
        columns: [
          { name: "No", align: "center" },
          { name: "names", align: "left" }, 
          { name: "Phone number", align: "center" }
        ],
      
        rows: sponsors?.map((sponsor, index) => ({
          "No": (
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {index + 1}
            </SoftTypography>
          ),
          "names": (
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {sponsor?.names}
            </SoftTypography>
          ),
          "Phone number": (
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {sponsor?.phoneNumber}
            </SoftTypography>
          )
        })),
      }

    const { columns, rows } = authorsTableData;
  
    return (
    <Card sx={{ py: 3 }}>
        <Container>
          <Stack
            direction="row"
            spacing={1}
            flexShrink={0}
            // sx={{ my: 0 }}
            justifyContent="space-between"
          >
            <Typography variant="h5">Sponsors Report</Typography>
          </Stack>
          <Stack justifyContent="end" direction={'row'} sx={{ my: 2 }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                labelId="select"
                id="select"
                value={date.month}
                onChange={e =>
                  setDate(prev => ({
                    ...prev,
                    month: e.target.value,
                  }))
                }
                label="Select "
                disabled={date.isYearly}
                required
                input={<OutlinedInput />}
              >
                {Object.keys(MONTHS).map((i, index) => {
                  return (
                    <MenuItem value={i} key={index}>
                      {MONTHS[i]}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 120, mx: 2 }}>
              <Select
                labelId="select"
                id="select"
                value={date.year}
                onChange={e =>
                  setDate(prev => ({
                    ...prev,
                    year: e.target.value,
                  }))
                }
                label="Select "
                required
                input={<OutlinedInput />}
              >
                {years().map((year, index) => {
                  return (
                    <MenuItem value={year} key={index}>
                      {year}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                labelId="select"
                id="select"
                value={date.isYearly}
                onChange={e =>
                  setDate(prev => ({
                    ...prev,
                    isYearly: e.target.value,
                  }))
                }
                label="Select "
                required
                input={<OutlinedInput />}
              >
                {[0, 1].map((label, index) => {
                  return (
                    <MenuItem value={label === 0} key={index}>
                      {label === 0 ? 'Annually' : 'Monthly'}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Box sx={{ flexGrow: 1 }}></Box>
            <SoftButton
              variant="gradient"
              color='info'
              sx={{ m: 2, mt: 0 }}
              onClick={() => exportPDF()}
              disabled={!sponsors.length}
            >
              Download PDF Report
            </SoftButton>
          </Stack>
          <DataWidget
            title={'Sponsors'}
            isLoading={isLoading && !sponsors.length && !isError}
            isError={
              !isLoading && !sponsors.length && isError ? isError : null
            }
            isEmpty={!isLoading && !sponsors.length && !isError}
            customEmptyMessage={`There are no sponsors available in this ${
              date.isYearly
                ? 'year, ' + date.year
                : 'month. ' + MONTHS[date.month] + ', ' + date.year
            }`}
          >
            <Table columns={columns} rows={rows} />
          </DataWidget>
        </Container>
      </Card>
    );
  };
  export default SponsorsReport;