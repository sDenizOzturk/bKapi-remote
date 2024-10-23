import { BaseCard, BaseWrapper } from 'binak-react-components';
import { FC, useCallback, useEffect, useState } from 'react';
import { PermanentLink } from '../../models/permanentLink';
import PermanentLinkItem from './PermanentLinkItem';
import { bounce } from '../../utils/animationVariants';
import useLoading from '../../hooks/useLoading';
import useError from '../../hooks/useError';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Paginator from '../ui/Paginator';
import CreateLink from './CreateLink';
import FilterLinks from './FilterLinks';
import { useTranslation } from 'react-i18next';
import { useCopyToClipboard } from 'usehooks-ts';
import LinkDialog from './LinkDialog';
import TabButtons from '../ui/TabButtons';
import useUrls from '../../hooks/useUrls';

const ListPermantLinks: FC = () => {
  const [permanentLinks, setPermanentLinks] = useState<PermanentLink[]>([]);

  const { t } = useTranslation();
  const loading = useSelector((state: RootState) => state.loading.loading);

  const [mode, setMode] = useState<
    'createPermanent' | 'createTemporary' | 'search'
  >('createPermanent');

  const modes = [
    { name: 'createPermanent', buttonText: t('Create Permanent') },
    { name: 'createTemporary', buttonText: t('Create Temporary') },
    { name: 'search', buttonText: t('Search') },
  ];

  const [filter, setFilter] = useState('');

  const { setLoading } = useLoading();
  const { setError } = useError();

  const token = useSelector((state: RootState) => state.auth.token);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [refetchCounter, setRefetchCounter] = useState(0);

  const { url } = useUrls();

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(
        url('listLinks', {
          filter,
          page: currentPage.toString(),
        }),
        {
          headers: {
            Authorization: 'Bearer ' + token.token,
          },
        }
      );
      const responseData = await response.json();

      if (response.status === 200) {
        setPermanentLinks(responseData.permanentLinks);
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

  const [link, setLink] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');

  const [_copiedText, copyToClipboard] = useCopyToClipboard();
  const displayLink = async (link: string, doorNumber: string) => {
    setLink(link);
    try {
      await copyToClipboard(link);
      setDialogTitle(t('Link is copied to clipboard') + ' - ' + doorNumber);
    } catch (err) {
      console.log('Link can not be copied to clipboard', err);
      setDialogTitle(t('Link is created') + ' - ' + doorNumber);
    }
  };

  const closeLinkDialog = () => {
    setLink('');
    setDialogTitle('');
  };

  return (
    <>
      <BaseCard>
        <TabButtons modes={modes} setMode={setMode} currentMode={mode} />
        <BaseWrapper style={{ minWidth: '20rem' }}>
          <CreateLink
            refetch={refetchData}
            setCurrentPage={setCurrentPage}
            setDisplayingLink={displayLink}
            mode={mode}
          />

          {mode === 'search' && (
            <FilterLinks
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
        {permanentLinks.map((permanentLink: PermanentLink) => (
          <PermanentLinkItem
            whileHover={bounce.s.scale}
            transition={bounce.m.transition}
            key={permanentLink.doorNumber}
            permanentLink={permanentLink}
            refetch={refetchData}
            setDisplayingLink={displayLink}
          />
        ))}
      </BaseWrapper>
      {!loading && permanentLinks.length === 0 && (
        <BaseCard style={{ marginTop: '-1rem' }}>
          {filter ? t('No links found.') : t('No links created.')}
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

      <LinkDialog
        onClose={closeLinkDialog}
        link={link}
        dialogTitle={dialogTitle}
      />
    </>
  );
};

export default ListPermantLinks;
