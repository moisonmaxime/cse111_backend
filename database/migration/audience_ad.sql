CREATE TABLE audience_ad (
    aa_id INTEGER PRIMARY KEY AUTOINCREMENT,
    aa_audience_id INT, 
    aa_ad_id INT,
    CONSTRAINT audid FOREIGN KEY(aa_audience_id) REFERENCES audience(a_id) on delete cascade,
    CONSTRAINT adid FOREIGN KEY(aa_ad_id) REFERENCES advertiser(ad_id) on delete cascade
);
