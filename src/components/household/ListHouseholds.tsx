import { BaseCard, BaseWrapper } from 'binak-react-components';
import { FC, useCallback, useEffect, useState } from 'react';
import { Household } from '../../models/household';
import { bounce } from '../../utils/animationVariants';
import useLoading from '../../hooks/useLoading';
import useError from '../../hooks/useError';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import urls from '../../utils/urls';
import Paginator from '../ui/Paginator';
import { useTranslation } from 'react-i18next';
import HouseholdItem from './HouseholdItem';
import CreateHousehold from './CreateHousehold';
import FilterHouseholds from './FilterHousehold';
import TabButtons from '../ui/TabButtons';

const ListHouseholds: FC = () => {
  const [households, setHouseholds] = useState<Household[]>([]);

  const { t } = useTranslation();

  const [mode, setMode] = useState<'create' | 'search'>('create');

  const modes = [
    { name: 'create', buttonText: t('Create or Open') },
    { name: 'search', buttonText: t('Search') },
  ];

  const [filter, setFilter] = useState('');

  const { setLoading } = useLoading();
  const { setError } = useError();

  const token = useSelector((state: RootState) => state.auth.token);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [refetchCounter, setRefetchCounter] = useState(0);

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const url =
        urls.listHouseholds +
        '?' +
        new URLSearchParams({
          filter,
          page: currentPage.toString(),
        });
      const response = await fetch(url, {
        headers: {
          Authorization: 'Bearer ' + token.token,
        },
      });
      const responseData = await response.json();

      if (response.status === 200) {
        setHouseholds(responseData.households);
        setCurrentPage(responseData.currentPage);
        setTotalPages(responseData.totalPages);
      } else {
        throw new Error(responseData.message);
      }
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  }, [token, filter, refetchCounter]);

  const refetchData = () => {
    setRefetchCounter(refetchCounter + 1);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <BaseCard>
        <TabButtons modes={modes} setMode={setMode} currentMode={mode} />
        <BaseWrapper style={{ minWidth: '20rem' }}>
          {mode === 'create' && <CreateHousehold />}
          {mode === 'search' && (
            <FilterHouseholds
              setFilter={(val) => {
                setFilter(val);
                setCurrentPage(0);
              }}
            />
          )}
        </BaseWrapper>
      </BaseCard>

      <BaseWrapper
        mode={['center']}
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          maxWidth: '60rem',
        }}
      >
        {households.map((household: Household) => (
          <HouseholdItem
            whileHover={bounce.s.scale}
            transition={bounce.m.transition}
            key={household.doorNumber}
            household={household}
            refetch={refetchData}
          />
        ))}
      </BaseWrapper>
      {households.length === 0 && (
        <BaseCard style={{ marginTop: '-1rem' }}>
          {filter ? t('No links found') : t('No links created')}
        </BaseCard>
      )}
      {totalPages > 1 && (
        <Paginator
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
          refetch={refetchData}
        />
      )}
    </>
  );
};

export default ListHouseholds;
