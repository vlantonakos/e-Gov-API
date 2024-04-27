import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [loadingTotalRecords, setLoadingTotalRecords] = useState(true);
  const [loadingMinistryId, setLoadingMinistryId] = useState(true);
  const [loadingTotalRecForMinistries, setLoadingTotalRecForMinistries] = useState(true);
  const [loadingTitleVoted, setLoadingTitleVoted] = useState(true);
  const [loadingAmendments, setLoadingAmendments] = useState(true);

  const [totalRecords, setTotalRecords] = useState(null);
  const [ministryId, setMinistryId] = useState(null);
  const [totalRecForMinistries, setTotalRecordsForMinistries] = useState(null);
  const [titleVoted, setTitleVoted] = useState(null);
  const [amendments, setAmendments] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lawsResponse = await fetch('http://localhost:5000/api/laws');
        if (lawsResponse.ok) {
          const lawsData = await lawsResponse.json();
          setTotalRecords(lawsData.TotalRecords);
        }
        setLoadingTotalRecords(false);

        const ministriesResponse = await fetch('http://localhost:5000/api/ministries');
        if (ministriesResponse.ok) {
          const ministriesData = await ministriesResponse.json();
          const ministryId = getMinistryId(ministriesData);
          setMinistryId(ministryId);
        }
        setLoadingMinistryId(false);

        const totalRecForMinistriesResponse = await fetch('http://localhost:5000/api/laws/ministry');
        if (totalRecForMinistriesResponse.ok) {
          const totalRecForMinistriesData = await totalRecForMinistriesResponse.json();
          setTotalRecordsForMinistries(totalRecForMinistriesData.TotalRecords);
        }
        setLoadingTotalRecForMinistries(false);

        const titleVotedResponse = await fetch('http://localhost:5000/api/laws/ministry/date');
        if (titleVotedResponse.ok) {
          const titleVotedData = await titleVotedResponse.json();
          setTitleVoted(titleVotedData?.Data[0]?.Title);
        }
        setLoadingTitleVoted(false);

        const amendmentsResponse = await fetch('http://localhost:5000/api/laws/ministry/amendment');
        if (amendmentsResponse.ok) {
          const amendmentData = await amendmentsResponse.json();
          setAmendments(amendmentData.TotalRecords);
        }
        setLoadingAmendments(false);

      } catch (error) {
        console.error('Error fetching data:', error);
        setLoadingTotalRecords(false);
        setLoadingMinistryId(false);
        setLoadingTotalRecForMinistries(false);
        setLoadingTitleVoted(false);
        setLoadingAmendments(false);
      }
    };

    fetchData();
  }, []);

  const getMinistryId = (ministriesData) => {
    const ministry = ministriesData.find(ministry => ministry.Name === "Εθνικής Οικονομίας και Οικονομικών");
    return ministry ? ministry.ID : null;
  };

  return (
    <>
    <h1>Πόσοι είναι όλοι οι νόμοι που είναι διαθέσιμοι μέσω του API;</h1>
    {loadingTotalRecords ? (
      <div class="loader"></div>
    ) : (
      <h3>{totalRecords}</h3>
    )}
    <hr></hr>
    <h1>Ποιο είναι το ID του υπουργείου "Εθνικής Οικονομίας και Οικονομικών";</h1>
    {loadingMinistryId ? (
      <div class="loader"></div>
    ) : (
      <h3>{ministryId}</h3>
    )}
    <hr></hr>
    <h1>Πόσοι είναι οι νόμοι (όλες οι κατηγορίες) για τους οποίους είναι αρμόδιο το υπουργείο "Ψηφιακής Διακυβέρνησης";</h1>
    {loadingTotalRecForMinistries ? (
      <div class="loader"></div>
    ) : (
      <h3>{totalRecForMinistries}</h3>
    )}
    <hr></hr>
    <h1>Ποιος είναι ο τίτλος του νόμου για τον οποίο είναι αρμόδιο το Υπουργείο "Παιδείας, Θρησκευμάτων και Αθλητισμού" και ψηφίστηκε στις 08 Μαρτίου 2024;</h1>
    {loadingTitleVoted ? (
      <div class="loader"></div>
    ) : (
      <h3>{titleVoted}</h3>
    )}
    <hr></hr>
    <h1>Πόσες είναι οι Διεθνείς Συμβάσεις για τις οποίες είναι αρμόδιο το Υπουργείο "Ανάπτυξης και Επενδύσεων";</h1>
    {loadingAmendments ? (
      <div class="loader"></div>
    ) : (
      <h3>{amendments}</h3>
    )}
  </>
  );
}

export default App;
